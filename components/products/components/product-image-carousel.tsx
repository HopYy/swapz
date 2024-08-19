'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/utils/cn';

interface CarouselProps {
  children: React.ReactNode[];
  size: number;
  hover?: boolean;
}

export const Carousel = ({
  children: images,
  size,
  hover = true,
}: CarouselProps) => {
  const [curr, setCurr] = useState(0);

  const prev = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
    e.preventDefault();
  };

  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));
    e.preventDefault();
  };

  return (
    <div className="rounded-sm overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images}
      </div>
      {images.length > 1 && hover && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-1">
            <button
              className="p-1 rounded-md shadow-md bg-white/80 text-gray-800 hover:bg-white"
              onClick={(e) => {
                prev(e);
              }}
            >
              <ChevronLeft size={size} />
            </button>
            <button
              className="p-1 rounded-md shadow-md bg-white/80 text-gray-800 hover:bg-white"
              onClick={(e) => {
                next(e);
              }}
            >
              <ChevronRight size={size} />
            </button>
          </div>
          <div className="absolute bottom-4 right-0 left-0 flex justify-center">
            <div className="max-w-16 overflow-hidden">
              <div
                className="flex items-center justify-start gap-2 delay-200 duration-100 ease-in-out"
                style={{
                  transform: `translateX(${curr >= 4 ? `-${curr - 2}rem` : '0'})`,
                }}
              >
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'transition-all min-w-2 max-w-2 w-2 h-2 bg-white rounded-full',
                      curr === index ? 'p-1' : 'bg-opacity-50'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
