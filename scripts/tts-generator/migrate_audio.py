"""把 audio/*.mp3 按 week 分组移到 miniprogram/audio-pkg-{a,b,c,d}/。

分组规则与 patch_contents.js 必须保持一致:
  week 1-2  -> audio-pkg-a
  week 3-4  -> audio-pkg-b
  week 5-6  -> audio-pkg-c
  week 7-10 -> audio-pkg-d
"""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).parent
AUDIO_DIR = ROOT / "audio"
MINIPROGRAM = ROOT.parent.parent / "miniprogram"

PKG_FOR_WEEK: dict[int, str] = {
    **{w: "audio-pkg-a" for w in (1, 2)},
    **{w: "audio-pkg-b" for w in (3, 4)},
    **{w: "audio-pkg-c" for w in (5, 6)},
    **{w: "audio-pkg-d" for w in (7, 8, 9, 10)},
}


def parse_week(filename: str) -> int:
    # filename: w1d1_warmUp_0.mp3
    return int(filename.split("d")[0][1:])


def main() -> None:
    if not AUDIO_DIR.exists():
        print(f"[err] {AUDIO_DIR} does not exist")
        return

    moved = 0
    for mp3 in AUDIO_DIR.glob("*.mp3"):
        week = parse_week(mp3.name)
        pkg = PKG_FOR_WEEK[week]
        dest_dir = MINIPROGRAM / pkg
        dest_dir.mkdir(exist_ok=True)
        dest = dest_dir / mp3.name
        if dest.exists():
            dest.unlink()
        shutil.move(str(mp3), str(dest))
        moved += 1
    print(f"[ok] moved {moved} mp3s into miniprogram/audio-pkg-*/")

    print("[run] patch_contents.js ...")
    subprocess.run(["node", str(ROOT / "patch_contents.js")], check=True)


if __name__ == "__main__":
    main()
