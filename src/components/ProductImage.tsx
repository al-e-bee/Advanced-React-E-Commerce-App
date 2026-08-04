// ProductImage.tsx
import React, { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const FALLBACK_IMAGE = "https://via.placeholder.com";

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "img-fluid",
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
};
