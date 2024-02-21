"use client"

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value: Array<string>
  disabled: boolean
  onChange: (value: string[]) => void
  onRemove: (value: string) => void 
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  onChange,
  onRemove
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }

  return ( 
<div>
      <div className="sm:w-[420px] mb-4 flex flex-wrap justify-center items-center gap-[20px]">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="k4nollw6">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button 
              type="button" 
              variant="secondary" 
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

