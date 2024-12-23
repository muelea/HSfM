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


def reduce_points(path: Path, max_points: int) -> dict:
    with gzip.open(path, "rb") as f:
        data = msgspec.msgpack.decode(f.read())

    write = False
    for timestamp, message in data["messages"]:
        if message["type"] == "PointCloudMessage":
            assert "props" in message
            assert isinstance(message["props"]["points"], bytes)
            assert isinstance(message["props"]["colors"], bytes)

            points = np.frombuffer(
                message["props"]["points"], dtype=np.float16
            ).reshape(-1, 3)
            colors = np.frombuffer(message["props"]["colors"], dtype=np.uint8).reshape(
                -1, 3
            )

            num_points = points.shape[0]
            if num_points > max_points:
                indices = np.random.choice(num_points, max_points, replace=False)
                points = points[indices]
                colors = colors[indices]
                write = True

            message["props"]["points"] = points.tobytes()
            message["props"]["colors"] = colors.tobytes()

    # Write back.
    if write:
        print(f"Reducing point cloud in {path.name}")
        packed_bytes = msgspec.msgpack.encode(data)
        compressed_data = gzip.compress(packed_bytes, compresslevel=9)

        with open(path, "wb") as f:
            f.write(compressed_data)

    return data


def main(path_root: Path, max_points: int) -> None:
    for viser_file in path_root.glob("*.viser"):
        print(viser_file.name)
        reduce_points(viser_file, max_points)


if __name__ == "__main__":
    tyro.cli(main)
