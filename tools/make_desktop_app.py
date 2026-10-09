"""바탕화면 '한성교회.app' 런처 생성: 배포 홈페이지를 기본 브라우저로 연다.
아이콘 = macOS 둥근 사각(슈퍼엘립스) 블랙 + 공식 H 심벌(애시드 라임) + 애시드 막대(도도 스킨 모티프).
심벌 원본: tools/hansung-mark-hires.png (공식 로고 AI에서 pdftocairo로 렌더, 투명 배경).
재생성: python3 tools/make_desktop_app.py"""
import os, shutil, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "https://won2070-commits.github.io/hansung-church/"
APP = os.path.expanduser("~/Desktop/한성교회.app")
INK, ACID = (11, 11, 10), (217, 255, 63)
S = 2048  # 2배로 그린 뒤 1024로 줄임


def squircle_mask(size, inset, n=5.0):
    """macOS 아이콘 같은 슈퍼엘립스 마스크(4배 해상도로 그려 매끈하게 축소)."""
    k = 2
    big = size * k
    m = Image.new("L", (big, big), 0)
    d = ImageDraw.Draw(m)
    c = big / 2
    r = big / 2 - inset * k
    for y in range(big):
        dy = abs((y + 0.5 - c) / r)
        if dy > 1:
            continue
        dx = (1 - dy ** n) ** (1 / n) * r
        d.line([(c - dx, y), (c + dx, y)], fill=255)
    return m.resize((size, size), Image.LANCZOS)


def icon():
    inset = int(S * 100 / 1024)  # macOS 아이콘 격자: 1024 캔버스 안 824 본체
    mask = squircle_mask(S, inset)

    # 본체: 잉크 블랙 + 위쪽 은은한 광택
    body = Image.new("RGBA", (S, S), INK + (255,))
    glow = Image.new("L", (S, S), 0)
    ImageDraw.Draw(glow).ellipse([S * 0.05, -S * 0.55, S * 0.95, S * 0.42], fill=34)
    glow = glow.filter(ImageFilter.GaussianBlur(S * 0.06))
    body = Image.composite(Image.new("RGBA", (S, S), (255, 255, 255, 255)), body, glow)

    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    # 바깥 그림자
    sm = mask.filter(ImageFilter.GaussianBlur(S * 0.018)).point(lambda v: int(v * 0.32))
    shadow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    shadow.paste((0, 0, 0, 255), (0, int(S * 0.012)), sm)
    out = Image.alpha_composite(out, shadow)
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    layer.paste(body, (0, 0), mask)
    out = Image.alpha_composite(out, layer)

    # 공식 H 심벌을 애시드로
    mark = Image.open(os.path.join(ROOT, "tools/hansung-mark-hires.png")).convert("RGBA")
    a = mark.split()[3]
    tw = int(S * 0.44)
    th = int(mark.height * tw / mark.width)
    a = a.resize((tw, th), Image.LANCZOS)
    col = Image.new("RGBA", (tw, th), ACID + (255,))
    col.putalpha(a)
    mx, my = (S - tw) // 2, int(S * 0.29)
    out.alpha_composite(col, (mx, my))

    # 도도 모티프: 심벌 아래 애시드 막대
    d = ImageDraw.Draw(out)
    bw, bh = int(S * 0.20), int(S * 0.034)
    by = my + th + int(S * 0.075)
    d.rectangle([(S - bw) // 2, by, (S + bw) // 2, by + bh], fill=ACID + (255,))
    return out.resize((1024, 1024), Image.LANCZOS)


def main():
    png = os.path.join(ROOT, "tools", "desktop-icon-1024.png")
    icon().save(png)

    tmp = tempfile.mkdtemp()
    iset = os.path.join(tmp, "app.iconset")
    os.makedirs(iset)
    big = Image.open(png)
    for s in (16, 32, 128, 256, 512):
        big.resize((s, s), Image.LANCZOS).save(f"{iset}/icon_{s}x{s}.png")
        big.resize((s * 2, s * 2), Image.LANCZOS).save(f"{iset}/icon_{s}x{s}@2x.png")
    icns = os.path.join(tmp, "applet.icns")
    subprocess.run(["iconutil", "-c", "icns", iset, "-o", icns], check=True)

    if os.path.exists(APP):
        shutil.rmtree(APP)
    script = (
        "try\n"
        f'\topen location "{URL}"\n'
        "on error\n"
        '\tdisplay dialog "한성교회 홈페이지를 열 수 없습니다. 인터넷 연결을 확인해 주세요." buttons {"확인"} default button 1\n'
        "end try"
    )
    subprocess.run(["osacompile", "-o", APP, "-e", script], check=True)
    shutil.copy(icns, os.path.join(APP, "Contents/Resources/applet.icns"))
    # 새 osacompile은 Assets.car(기본 스크립트 아이콘)를 넣고 CFBundleIconName으로 우선 사용 → 제거해 .icns가 쓰이게
    car = os.path.join(APP, "Contents/Resources/Assets.car")
    if os.path.exists(car):
        os.remove(car)
    subprocess.run(["/usr/libexec/PlistBuddy", "-c", "Delete :CFBundleIconName", os.path.join(APP, "Contents/Info.plist")], check=False, capture_output=True)
    subprocess.run(["/usr/libexec/PlistBuddy", "-c", "Set :CFBundleIconFile applet", os.path.join(APP, "Contents/Info.plist")], check=False, capture_output=True)
    # 아이콘 교체 후 애드혹 재서명 + Finder 아이콘 캐시 갱신
    subprocess.run(["codesign", "--force", "--deep", "-s", "-", APP], check=False, capture_output=True)
    os.utime(APP, None)
    subprocess.run([
        "/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",
        "-f", APP,
    ], check=False)
    print("made", APP)


if __name__ == "__main__":
    main()
