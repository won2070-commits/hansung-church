"""공식 홈페이지 안내 페이지(교회안내·섬기는이들·예배·헌금·오시는길·새가족·생방송·행축ON·메인)를 data/site.json 으로 추출.
예배시간표는 JS로 그려지는 페이지라 WORSHIP 상수에 2026-10-07 브라우저 확인본을 둔다."""
import re, json, html, os
from scrape import get, local, txt, ROOT

def page(path):
    s = get('https://www.hansungchurch.com' + path)
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S)
    return s[s.find('<h2 class="title">'):s.find('<footer')]

def lines(s):
    s = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', s, flags=re.S)
    s = re.sub(r'<br\s*/?>|</(p|div|li|h\d|tr)>', '\n', s)
    return [x.strip() for x in html.unescape(re.sub(r'<[^>]+>', ' ', s)).splitlines() if x.strip()]

def img(u, sub='static'):  # ../../images/x.jpg → media/static/x.jpg
    return local('/' + u.lstrip('./'), sub)

def people(path, base):
    s = page(path); out = []
    for gname, block in re.findall(r'<h2 class="txp[^"]*">(.*?)</h2>(.*?)(?=<h2 class="txp|$)', s, re.S):
        members = []
        for card in re.split(r'<img ', block)[1:]:
            src = re.search(r'src="([^"]+)"', card).group(1)
            name = txt(re.search(r'<h4[^>]*>(.*?)</h4>', card, re.S).group(1)) if '<h4' in card else ''
            ps = re.search(r'class="ps[^"]*">(.*?)</p>', card, re.S)
            pss = re.search(r'class="pss[^"]*">(.*?)</p>', card, re.S)
            code = re.search(r'tbcode=(\w+)&code=(\d+)', card)
            members.append({'name': name, 'role': txt(ps.group(1)) if ps else '',
                            'email': txt(pss.group(1)) if pss else '', 'photo': img(src, 'static/' + base),
                            'sermons': {'board': code.group(1), 'code': code.group(2)} if code else None})
        out.append({'group': txt(gname), 'members': [m for m in members if m['name']]})
    return out

WORSHIP = {
 '주일 예배': [['1부 예배','주일 오전 8:00','H-홀(워십센터 2층)'],['2부 예배','주일 오전 10:00','H-홀(워십센터 2층)'],['3부 예배','주일 정오 12:00','H-홀(워십센터 2층)'],['4부 예배','주일 오후 2:00','H-홀(워십센터 2층)'],['5부 예배(젊은이예배)','주일 오후 3:40','H-홀(워십센터 2층)'],['6부 예배','주일 저녁 8:00','H-홀(워십센터 2층)'],['성인 영어예배','주일 정오 12:00','비전센터 5층'],['중국어 예배','주일 오후 2:00','비전센터 5층']],
 '교회학교': [['영유아부 1부(0~3세)','주일 오전 10:00','비전센터 3층'],['영유아부 2부(0~3세)','주일 정오 12:00','비전센터 3층'],['유치부 1부(4~6세)','주일 오전 10:00','비전센터 3층'],['유치부 2부(4~6세)','주일 정오 12:00','비전센터 3층'],['취학부 1부(7~12세)','주일 오전 10:00','비전센터 1층'],['취학부 2부(7~12세)','주일 정오 12:00','비전센터 1층'],['청소년부 1부(13~18세)','주일 오전 10:00','비전센터 2층'],['청소년부 2부(13~18세)','주일 정오 12:00','비전센터 2층'],['캡틴 워십','주일 오후 2:00','비전센터 1층'],['eKids 영어예배(4~12세)','주일 오전 10:00','비전센터 5층'],['홀리킥 사랑부 1부(6~12세)','주일 오전 10:00','비전센터 5층'],['홀리킥 사랑부 2부(13세~청장년)','주일 정오 12:00','비전센터 5층'],['차세대 더브레이크워십','매주(토) 오후 6:30','비전센터 1층']],
 '주중 예배': [['토요청년예배(뉴웨이브워십)','매주(토) 오후 7:00','H-홀(워십센터 2층)'],['화요전도예배(행복전도대)','매주(화) 오전 10:30','H-홀(워십센터 2층)'],['HUG수요오전예배','매주(수) 오전 10:30','H-홀(워십센터 2층)'],['수요저녁예배','매주(수) 오후 7:30','H-홀(워십센터 2층)'],['새벽 1부 기도회','월~금 오전 5:00','더 채플(비전센터 2층)'],['새벽 2부 기도회','월~금 오전 6:00','H-홀(워십센터 2층)'],['금요성령집회','매주(금) 저녁 8:50','H-홀(워십센터 2층)'],['소망대학','매주(목) 오전 10:30','H-홀(워십센터 2층)']],
}

def main():
    site = {'checked': '2026-10-07'}
    g = lines(page('/html/sub01/01.asp'))
    site['greeting'] = {'credentials': [x.replace('겸임교수', '겸임교수 역임') if x.endswith('겸임교수') else x for x in g[1:5]],
                        'headline': g[5], 'paragraphs': g[6:]}
    site['pastors'] = people('/html/sub01/02.asp', 'man')
    site['stewards'] = people('/html/sub01/02_2.asp', 'people')
    site['worship'] = WORSHIP
    gv = page('/html/sub01/05.asp')
    accts = re.findall(r'<(?:p|h\d|span|div)[^>]*>\s*([^<]{2,12})\s*</(?:p|h\d|span|div)>\s*(?:<[^>]+>\s*)*?([\d-]{9,})', gv)
    site['giving'] = {
        'note': '입금 시 송금자명에 이름 + 휴대폰 뒷번호 + 헌금명으로 적어 주세요. 예) 홍길동1977감사, 홍길동1977십일, 홍길동1977주정',
        'accounts': [{'label': '십일조', 'bank': '신한은행', 'no': '140-014-474308'},
                     {'label': '주정헌금', 'bank': '새마을금고', 'no': '9002-1956-1095-7'},
                     {'label': '입금계좌', 'bank': '새마을금고', 'no': '9002-1686-3620-6'}],  # 농협 355-0002-8201-63 은 공식 헌금 페이지에서 주석 처리(숨김) 상태라 제외
        'items': [['감사 헌금','감사'],['비전 헌금','비전'],['교회사랑 헌금','교사'],['건축 헌금','건축'],['부흥회 헌금','부흥'],['생일감사 헌금','생일'],['선교 헌금','선교'],['십일조 헌금','십일'],['오병이어 헌금','오병'],['월삭 헌금','월삭'],['임직 헌금','임직'],['자녀비전 헌금','자비'],['주일 헌금','주일'],['절기 헌금','절기'],['장학 헌금','장학'],['특별작정 헌금','특작']],
        'banks': [[t, u] for t, u in [('국민은행','https://www.kbstar.com'),('기업은행','https://www.ibk.co.kr'),('농협','https://www.nonghyup.com'),('새마을금고','https://www.kfcc.co.kr'),('신한은행','https://www.shinhan.com'),('우리은행','https://www.wooribank.com'),('하나은행','https://www.kebhana.com')]],
        'raw_check': accts[:8]}
    dr = page('/html/sub01/06.asp')
    site['directions'] = {'lines': lines(dr)[1:], 'maps': [img(u) for u in re.findall(r'<img[^>]+src="([^"]+)"', dr)]}
    nf = page('/html/sub01/07.asp')
    site['newcomer'] = {'lines': lines(nf)[1:], 'form': re.search(r'href="(https://docs\.google[^"]+)"', nf).group(1),
                        'images': [img(u) for u in re.findall(r'<img[^>]+src="([^"]+)"', nf) if 'tx-dot' not in u]}
    lv = page('/html/sub04/01.asp')
    site['live'] = {'lines': [x for x in lines(lv)[1:] if '자체생방송' not in x and '코로나' not in x],
                    'youtube': 'https://www.youtube.com/@happypeople7094/streams'}
    site['happy'] = {'lines': lines(page('/html/sub05/01.asp'))[1:],
                     'links': [['행축ON','https://www.hansungchurch.com/newlife/main.asp'],['행복매뉴얼','https://heyzine.com/flip-book/11759ae7a5.html'],['행축아카데미','http://www.happymaker.academy/html/main.asp'],['가을행축','http://www.hansungchurch.com/newlife/main.asp']]}
    m = get('https://www.hansungchurch.com/html/main.asp')
    site['home'] = {'slides': [local('/upload_data/TP/contents/' + u, 'static') for u in dict.fromkeys(re.findall(r'MainSlides/[^"\'\s)]+', m))],
                    'video': 'BiXGPp8r38c'}
    site['contact'] = {'zip': '08081', 'address': '서울특별시 양천구 신정로13길 21', 'denomination': '대한예수교장로회',
                       'tel': '02-2603-7200', 'fax': '02-2603-1115', 'email': 'happymaker@hansungchurch.com',
                       'sns': {'youtube': 'https://www.youtube.com/channel/UCwg1mSaYYvY4zzxyCnjgo7A', 'instagram': 'https://www.instagram.com/hansung_church/', 'facebook': 'https://www.facebook.com/hansungcross'}}
    json.dump(site, open(os.path.join(ROOT, 'data', 'site.json'), 'w'), ensure_ascii=False, indent=1)
    print('pastor groups', [(g['group'], len(g['members'])) for g in site['pastors']])
    print('stewards', sum(len(g['members']) for g in site['stewards']), 'slides', len(site['home']['slides']))
    print('greeting', site['greeting']['credentials']); print('giving check', site['giving']['raw_check'])
    print('directions', site['directions']['lines'][:3], site['directions']['maps'])

if __name__ == '__main__':
    main()
