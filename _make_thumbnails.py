import random
import sys
from pathlib import Path

import cv2
import tyro


def create_thumbnail(
    video_path: Path,
    output_path: Path,
    size: tuple[int, int] = (300, 300),
    overwrite: bool = False,
) -> None:
    if output_path.exists() and not overwrite:
        print(f"Skipping {video_path.name} - thumbnail already exists")
        return

    video = None
    try:
        # Open the video file
        video = cv2.VideoCapture(str(video_path))

        # Check if video opened successfully
        if not video.isOpened():
            raise IOError("Error opening video file")

        # Get the total number of frames
        total_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

        # Choose a random frame
        random_frame = random.randint(0, total_frames - 1)
        video.set(cv2.CAP_PROP_POS_FRAMES, random_frame)

        # Read the random frame
        success, frame = video.read()
        if not success:
            raise IOError("Error reading random video frame")

        # Resize the frame
        aspect_ratio = frame.shape[1] / frame.shape[0]
        if aspect_ratio > 1:
            new_width = min(size[0], frame.shape[1])
            new_height = int(new_width / aspect_ratio)
        else:
            new_height = min(size[1], frame.shape[0])
            new_width = int(new_height * aspect_ratio)

        resized_frame = cv2.resize(frame, (new_width, new_height))

        # Save the frame as a thumbnail
        cv2.imwrite(str(output_path), resized_frame)

        print(f"Thumbnail created for {video_path.name}")
    except Exception as e:
        print(
            f"Error creating thumbnail for {video_path.name}: {str(e)}", file=sys.stderr
        )
    finally:
        if video is not None:
            video.release()


def main(
    input_dir: Path = Path.cwd(),
    output_dir: Path | None = None,
    overwrite: bool = False,
    size: tuple[int, int] = (300, 300),
) -> None:
    """
    Create thumbnails for all MP4 files in the specified input directory and save them to the output directory.

    Args:
        input_dir: Directory to search for MP4 files. Default is the current working directory.
        output_dir: Directory to save the generated thumbnails. Default is to match input_dir.
        overwrite: If True, overwrite existing thumbnails. Default is False.
        size: Maximum size of thumbnails as (width, height). Default is (300, 300).
    """
    input_dir = input_dir.resolve()
    if output_dir is None:
        output_dir = input_dir
    output_dir = output_dir.resolve()

    if not input_dir.is_dir():
        print(f"Error: Input directory does not exist: {input_dir}", file=sys.stderr)
        sys.exit(1)

    output_dir.mkdir(parents=True, exist_ok=True)

    mp4_files = list(input_dir.glob("*.mp4"))
    if not mp4_files:
        print(f"No MP4 files found in {input_dir}", file=sys.stderr)
        sys.exit(1)

    for video_path in mp4_files:
        thumbnail_path = output_dir / f"{video_path.stem}_thumbnail.jpg"
        create_thumbnail(video_path, thumbnail_path, size=size, overwrite=overwrite)


if __name__ == "__main__":
    tyro.cli(main)
