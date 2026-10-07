"""media/ 원본 → public/media/ 웹용(WebP, 긴 변 1200px). 원본은 ../한성교회홈페이지_원본미디어/ 로 옮겨 보관(삭제 없음).
data/*.json 안의 경로도 새 파일명으로 바꾼다. 다시 수집한 뒤 반복 실행해도 된다."""
import os, re, json, glob, shutil
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, DST = os.path.join(ROOT, 'media'), os.path.join(ROOT, 'public', 'media')
ARCHIVE = os.path.join(os.path.dirname(ROOT), '한성교회홈페이지_원본미디어')
IMG = ('.jpg', '.jpeg', '.png', '.gif', '.bmp')
MAX, Q = 1200, 66

def out_rel(rel):
    base, ext = os.path.splitext(rel)
    return base + '.webp' if ext.lower() in IMG else rel

def work(path):
    rel = os.path.relpath(path, ROOT)          # media/code/name.jpg
    dst = os.path.join(ROOT, 'public', out_rel(rel))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if os.path.splitext(path)[1].lower() in IMG:
        try:
            im = ImageOps.exif_transpose(Image.open(path))
            im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
            im.thumbnail((MAX, MAX * 3))       # 세로로 긴 주보·포스터는 높이 여유
            im.save(dst, 'WEBP', quality=Q, method=5)
        except Exception as e:
            print('skip', rel, e); return rel, None
    else:
        shutil.copy2(path, dst)
    arch = os.path.join(ARCHIVE, rel); os.makedirs(os.path.dirname(arch), exist_ok=True)
    shutil.move(path, arch)
    return rel, out_rel(rel)

files = [p for p in glob.glob(os.path.join(SRC, '**', '*'), recursive=True) if os.path.isfile(p)]
with ThreadPoolExecutor(8) as ex:
    mapping = dict(ex.map(work, files))
# data/*.json 안의 media/... 경로를 웹용 파일명으로(본문 HTML 속 경로 포함). 이미 변환된 파일 기준이라 여러 번 돌려도 안전.
pat = re.compile(r'media/[^"\'\s<>]+?\.(?:jpe?g|png|gif|bmp)', re.I)
def fix(v):
    if isinstance(v, str):
        return pat.sub(lambda m: out_rel(m.group(0)) if os.path.exists(os.path.join(ROOT, 'public', out_rel(m.group(0)))) else m.group(0), v)
    if isinstance(v, list): return [fix(x) for x in v]
    if isinstance(v, dict): return {k: fix(x) for k, x in v.items()}
    return v
for f in glob.glob(os.path.join(ROOT, 'data', '*.json')):
    d = json.load(open(f))
    json.dump(fix(d), open(f, 'w'), ensure_ascii=False, indent=0 if 'site' not in f else 1)
print('files', len(files))
