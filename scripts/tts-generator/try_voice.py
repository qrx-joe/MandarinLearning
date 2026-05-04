"""试听样本：生成 3 句典型长度的音频，听完决定是否全量生成。"""
import asyncio
from pathlib import Path

import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"  # 标准女声，可换 zh-CN-YunxiNeural（男声）等

SAMPLES = [
    ("sample_short", "牛奶"),
    ("sample_medium", "我想买牛奶。"),
    ("sample_long", "奶奶去南宁买牛奶，路上看见水流得很急，她说：哪里有水，哪里就有生命。"),
]


async def main() -> None:
    out_dir = Path(__file__).parent / "samples"
    out_dir.mkdir(exist_ok=True)

    for name, text in SAMPLES:
        path = out_dir / f"{name}.mp3"
        comm = edge_tts.Communicate(text, VOICE)
        await comm.save(str(path))
        size_kb = path.stat().st_size / 1024
        print(f"  {path.name}  {size_kb:6.1f} KB  ({len(text)} chars)")


if __name__ == "__main__":
    asyncio.run(main())
