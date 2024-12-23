"""Modify .viser files to hide coordinate frames."""

# Reference:
#
# def serialize(
# """End the recording and serialize contents. Returns the recording as
#     bytes, which should generally be written to a file."""
#     packed_bytes = msgspec.msgpack.encode(
#         {
#             "loopStartIndex": loop_start_index,
#             "durationSeconds": time,
#             "messages": messages,
#         }
#     )
#     assert isinstance(packed_bytes, bytes)
#     return gzip.compress(packed_bytes, compresslevel=9)

import gzip
from pathlib import Path

import msgspec.msgpack
import numpy as np
import tyro


def reduce_points(path: Path):
    with gzip.open(path, "rb") as f:
        data = msgspec.msgpack.decode(f.read())

    write = False
    for timestamp, message in data["messages"]:
        if message["type"] == "GaussianSplatsMessage":
            assert "props" in message
            assert isinstance(message["props"]["buffer"], bytes)

            gaussians = np.frombuffer(message["props"]["buffer"], dtype=np.int32).reshape(
                -1, 8
            )
            print(gaussians.shape[0])


def main(path_root: Path) -> None:
    for viser_file in path_root.glob("*.viser"):
        print(viser_file.name)
        reduce_points(viser_file)


if __name__ == "__main__":
    tyro.cli(main)
