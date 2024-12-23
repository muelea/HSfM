import os
from dataclasses import dataclass

import tyro
from PIL import Image


def crop_transparent(image):
    # Get the bounding box
    bbox = image.getbbox()

    # Crop the image to the contents of the bounding box
    if bbox:
        return image.crop(bbox)
    else:
        # Return the original image if there's no bounding box (i.e., image is entirely transparent)
        return image


def process_directory(input_dir: str, output_dir: str):
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Process each PNG file in the input directory
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(".png"):
            filepath = os.path.join(input_dir, filename)
            with Image.open(filepath) as img:
                # Convert the image to RGBA if it's not already
                img = img.convert("RGBA")

                # Resize the image if its width is greater than 1400 pixels
                if img.width > 1400:
                    ratio = 1400 / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((1400, new_height), Image.LANCZOS)

                # Crop the image
                cropped_img = crop_transparent(img)

                # Save the cropped image
                output_path = os.path.join(output_dir, filename)
                cropped_img.save(output_path)
                print(f"Processed: {filename}")


def main(input_directory: str, output_directory: str):
    print(f"Processing images from {input_directory}")
    print(f"Saving cropped images to {output_directory}")
    process_directory(input_directory, output_directory)
    print("Processing complete!")


if __name__ == "__main__":
    tyro.cli(main)
