"""全量生成 contents.js 中所有 text 的 mp3。

- 通过 dump_contents.js (Node) 取出所有 items
- 用 edge-tts 并发合成
- 已存在的文件跳过(支持断点续传)
- 输出到 ./audio/
"""

from __future__ import annotations

import asyncio
import json
import subprocess
import sys
from pathlib import Path

import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"  # 女声,温和清晰
CONCURRENCY = 6  # edge-tts 太多并发会被限流

ROOT = Path(__file__).parent
AUDIO_DIR = ROOT / "audio"
DUMP_SCRIPT = ROOT / "dump_contents.js"


def load_items() -> list[dict]:
    subprocess.run(["node", str(DUMP_SCRIPT)], check=True)
    items_path = ROOT / "items.json"
    return json.loads(items_path.read_text(encoding="utf-8"))


async def synth_one(
    sem: asyncio.Semaphore, text: str, dest: Path, label: str
) -> tuple[str, str | None]:
    async with sem:
        try:
            comm = edge_tts.Communicate(text, VOICE)
            await comm.save(str(dest))
            if dest.stat().st_size == 0:
                return label, "empty file"
            return label, None
        except Exception as e:  # noqa: BLE001 - 任何失败都收集汇总
            if dest.exists():
                dest.unlink(missing_ok=True)
            return label, str(e)


async def main() -> None:
    AUDIO_DIR.mkdir(exist_ok=True)
    items = load_items()
    print(f"[info] total items in contents.js: {len(items)}", flush=True)

    sem = asyncio.Semaphore(CONCURRENCY)
    todo = []
    skipped = 0
    for item in items:
        dest = AUDIO_DIR / item["filename"]
        if dest.exists() and dest.stat().st_size > 0:
            skipped += 1
            continue
        label = f"{item['filename']:30s}  ({len(item['text'])} chars)"
        todo.append(synth_one(sem, item["text"], dest, label))

    print(f"[info] skipped (already exist): {skipped}", flush=True)
    print(f"[info] to generate: {len(todo)}", flush=True)
    if not todo:
        print_summary(items)
        return

    failures: list[tuple[str, str]] = []
    done = 0
    total = len(todo)
    for coro in asyncio.as_completed(todo):
        label, err = await coro
        done += 1
        if err:
            failures.append((label, err))
            print(f"  [{done}/{total}] FAIL  {label}  -> {err}", flush=True)
        elif done % 20 == 0 or done == total:
            print(f"  [{done}/{total}] ok", flush=True)

    print_summary(items, failures)


def print_summary(items: list[dict], failures: list[tuple[str, str]] | None = None) -> None:
    failures = failures or []
    files = list(AUDIO_DIR.glob("*.mp3"))
    total_size = sum(p.stat().st_size for p in files)
    print()
    print("=== Summary ===", flush=True)
    print(f"items in source : {len(items)}", flush=True)
    print(f"mp3 on disk     : {len(files)}", flush=True)
    print(f"total size      : {total_size / 1024 / 1024:.2f} MB", flush=True)
    print(f"failed          : {len(failures)}", flush=True)
    if failures:
        print("--- failures ---", flush=True)
        for label, err in failures:
            print(f"  {label}  ->  {err}", flush=True)
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
