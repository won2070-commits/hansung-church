"""공식 홈페이지(hansungchurch.com) 게시판 수집기.
게시판별로 목록을 최신순으로 넘기며 CUTOFF 이후 글만 data/<code>.json 에 저장한다.
본문 이미지·첨부는 media/<code>/ 로 내려받는다(이미지는 tools/shrink.sh 로 축소)."""
import re, json, html, os, sys, time, urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor

BASE = 'https://www.hansungchurch.com'
CUTOFF = '2025-01-01'
MIN_POSTS = 20
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOARDS = {  # code: (module, 이름, 그룹)
 'worship01_1': ('Media', '주일설교', 'sermon'), 'worship01_2': ('Media', '금요설교', 'sermon'),
 'worship01_3': ('Media', '수요예배', 'sermon'), 'special02': ('Media', '특새설교', 'sermon'),
 'worship01_4': ('Media', '특별집회', 'sermon'), 'worship01_5': ('Media', '청년예배설교', 'sermon'),
 'worship01_7': ('Media', '화요전도예배', 'sermon'),
 'worship02_1': ('Media', '주일찬양', 'praise'), 'worship02_2': ('Media', '금요찬양', 'praise'), 'worship02_3': ('Media', '찬양대', 'praise'),
 'community01': ('Board', '공지사항', 'life'), 'community02': ('Board', '사진게시판', 'life'),
 'special01': ('Board', '특새은혜나눔', 'life'), 'special04': ('Board', '특새스케치', 'life'),
 'community16': ('Board', '차세대 주보 하키TOPIC', 'life'), 'community17': ('Board', '가정예배 시즌1', 'life'),
 'community18': ('Board', '사랑나눔', 'life'),
 'intro04': ('Board', '교회주보', 'about'), 'gallery01': ('Board', '갤러리H', 'about'),
}

def get(url, binary=False, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            raw = urllib.request.urlopen(req, timeout=30).read()
            if binary: return raw
            try: return raw.decode('utf-8')
            except UnicodeDecodeError: return raw.decode('cp949', 'replace')
        except Exception as e:
            if i == tries - 1: raise
            time.sleep(2)

def ymd(s):
    s = s.strip()
    m = re.match(r'(\d{4})[.\-](\d{1,2})[.\-](\d{1,2})', s) or re.match(r'(\d{2})[.\-](\d{1,2})[.\-](\d{1,2})$', s)
    if not m: return ''
    y = m.group(1); y = y if len(y) == 4 else '20' + y
    return f'{y}-{int(m.group(2)):02d}-{int(m.group(3)):02d}'

def txt(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()

def list_page(code, mod, page):
    s = get(f'{BASE}/EZ/rb/board.asp?BoardModule={mod}&tbcode={code}&page={page}')
    items = []
    for seq in dict.fromkeys(re.findall(r'view\.asp\?seq=(\d+)', s)):
        i = s.find(f'seq={seq}'); chunk = s[i:i + 2500]
        d = re.findall(r'(\d{4}\.\d{2}\.\d{2}|\b\d{2}\.\d{2}\.\d{2}\b)', chunk)
        items.append({'seq': int(seq), 'listDate': ymd(d[0]) if d else ''})
    return items

def local(url, code, label=''):
    """원본 첨부/이미지 URL을 media/<code>/파일명 으로 내려받고 상대경로 반환."""
    u = urllib.parse.urljoin(BASE + '/EZ/rb/', html.unescape(url))
    name = urllib.parse.unquote(u.split('/')[-1].split('?')[0])
    if 'download.asp' in u:
        name = 'file_' + re.search(r'seq=(\d+)', u).group(1) + os.path.splitext(label)[1].lower()
    name = re.sub(r'[^\w.\-()가-힣]', '_', name)
    rel = f'media/{code}/{name}'
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        try:
            data = get(u, binary=True)
            os.makedirs(os.path.dirname(path), exist_ok=True)
            open(path, 'wb').write(data)
        except Exception as e:
            print('  ! media fail', u, e, file=sys.stderr); return u
    return rel

def post(code, mod, seq):
    s = get(f'{BASE}/EZ/rb/view.asp?seq={seq}&BoardModule={mod}&tbcode={code}')
    title = txt(re.search(r'id="bo_v_title">(.*?)</h4>', s, re.S).group(1))
    meta = {txt(k).rstrip(' :'): txt(v) for k, v in re.findall(r'<h6[^>]*><b>(.*?)</b>\s*<span[^>]*>(.*?)</span></h6>', s, re.S)}
    ua = re.search(r'<ul class="user_area[^"]*">(.*?)</ul>', s, re.S)
    lis = [txt(x) for x in re.findall(r'<li[^>]*>(.*?)</li>', ua.group(1), re.S)] if ua else []
    date = ymd(meta.get('날 짜', '')) or next((ymd(x) for x in lis if ymd(x)), '')
    views = next((int(x.replace(',', '')) for x in lis[::-1] if re.fullmatch(r'[\d,]+', x)), 0)
    body = re.search(r'id="bo_v_con"[^>]*>(.*?)</div>\s*<!-- } 본문 내용 끝', s, re.S)
    body = body.group(1).strip() if body else ''
    yt = list(dict.fromkeys(re.findall(r'(?:youtube(?:-nocookie)?\.com/embed/|youtu\.be/|youtube\.com/watch\?v=)([\w-]{11})', body)))
    files = [{'name': txt(n), 'url': u} for u, n in re.findall(r'<a href="(download\.asp\?[^"]+)">([^<]+)', s)]
    return {'seq': seq, 'title': title, 'date': date, 'views': views,
            'bible': meta.get('본문말씀', ''), 'preacher': meta.get('설교자', ''),
            'youtube': yt, 'body': body, 'files': files}

def localize(p, code):
    imgs = []
    def rep(m):
        rel = local(m.group(2), code); imgs.append(rel)
        return m.group(1) + rel + m.group(3)
    body = re.sub(r'(<img[^>]+src=")([^"]+)(")', rep, p['body'])
    # 원본 서식(인라인 style/class/iframe) 제거 → 새 디자인에서 다시 입힘
    body = re.sub(r'<(style|script)[^>]*>.*?</\1>', '', body, flags=re.S)
    body = re.sub(r'<div class="embed-container">.*?</div>', '', body, flags=re.S)
    body = re.sub(r'<iframe.*?</iframe>', '', body, flags=re.S)
    body = re.sub(r'\s(style|class|width|height|align|face|color|size)="[^"]*"', '', body)
    body = re.sub(r'</?(font|span)[^>]*>', '', body)
    body = re.sub(r'<p>\s*(<br>)?\s*</p>', '', body).strip()
    p['body'] = body; p['images'] = imgs
    for f in p['files']:
        f['url'] = local(f['url'], code, f['name'])
    return p

def scrape(code):
    mod, name, group = BOARDS[code]
    seqs, page = [], 1
    while True:
        items = list_page(code, mod, page)
        if not items: break
        new = [i for i in items if i['seq'] not in {x['seq'] for x in seqs}]
        if not new: break
        seqs += new
        dated = [i['listDate'] for i in new if i['listDate']]
        if dated and max(dated) < CUTOFF: break  # 고정글 섞여도 페이지 전체가 지난 날짜면 종료
        page += 1
    with ThreadPoolExecutor(6) as ex:
        posts = list(ex.map(lambda i: post(code, mod, i['seq']), seqs))
    posts.sort(key=lambda p: (p['date'], p['seq']), reverse=True)
    posts = [p for i, p in enumerate(posts) if p['date'] >= CUTOFF or i < MIN_POSTS]  # 멈춘 게시판도 최근 20건은 보존
    with ThreadPoolExecutor(6) as ex:
        posts = list(ex.map(lambda p: localize(p, code), posts))
    posts.sort(key=lambda p: (p['date'], p['seq']), reverse=True)
    os.makedirs(os.path.join(ROOT, 'data'), exist_ok=True)
    json.dump({'code': code, 'name': name, 'group': group, 'posts': posts},
              open(os.path.join(ROOT, 'data', code + '.json'), 'w'), ensure_ascii=False, indent=0)
    print(f'{name:14} {code:12} list-pages {page:3}  posts {len(posts):4}', flush=True)

if __name__ == '__main__':
    for code in (sys.argv[1:] or BOARDS):
        scrape(code)
