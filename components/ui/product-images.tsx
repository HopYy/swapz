'use client';

import { useState } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';
import { cn } from '@/utils/cn';

interface ProductImagesProps {
  url: string;
  sold?: boolean;
  className?: string;
}

export const ProductImages: React.FC<ProductImagesProps> = ({
  url,
  sold,
  className,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={cn(
        'aspect-square relative rounded-md overflow-hidden bg-gray-200',
        className && className
      )}
    >
      {url && !imageError && (
        <Image
          src={url}
          fill={true}
          sizes="100%"
          priority={true}
          alt="Product image"
          onError={handleImageError}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      )}
      {imageError && (
        <Skeleton
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '10px',
          }}
        />
      )}
      {sold && (
        <div className="flex justify-center items-center absolute inset-0 w-full h-full bg-black/70">
          <span className="text-white text-xl text-center font-medium">
            Sold out
          </span>
        </div>
      )}
    </div>
  );
};
