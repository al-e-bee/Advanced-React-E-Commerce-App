// ProductImage.tsx
import React, { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  style: React.CSSProperties;
}

const FALLBACK_IMAGE = "https://placehold.co/200x200?text=No+Image";

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "img-fluid",
  style,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
};
