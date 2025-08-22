"use client";
import { useState } from "react";
import "./ImageBlock.scss";
import Image from "next/image";

type Props = {
  images: string[];
};

export const ImageBlock: React.FC<Props> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="images">
      <div className="images__all">
        {images.length > 0 ? (
          images.map((img, i) => (
            <Image
              src={img}
              alt={`Image ${i + 1}`}
              key={i}
              width={100}
              height={100}
              className="images__all-item"
              onClick={() => setCurrentImage(img)}
            />
          ))
        ) : (
          <p className="images__all--no-images">No images available.</p>
        )}
      </div>

      <Image
        src={currentImage}
        alt="Selected Product Image"
        width={600}
        height={400}
        className="images__selected"
      />
    </div>
  );
};
