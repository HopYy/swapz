import { CldUploadWidget } from 'next-cloudinary';
import { Plus, X } from 'lucide-react';

import { cn } from '@/utils/cn';
import { ProductImages } from '@/components/ui/product-images';

interface ImageUploadProps {
  values: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  values,
}) => (
  <div className="pb-3 mx-auto max-w-52 md:max-w-72 lg:max-w-96">
    <div className="flex flex-wrap flex-row-reverse gap-5">
      {values.length > 0 &&
        values.map((url, index) => (
          <div
            key={index}
            className={cn(
              'aspect-square rounded-md relative',
              index === 0 ? 'w-52 md:w-72 lg:w-96' : 'w-20'
            )}
          >
            <ProductImages url={url} />
            <div className="z-10 absolute top-2 right-2">
              <div
                className="p-1 bg-black rounded-md cursor-pointer"
                onClick={() => onRemove(url)}
              >
                <X color="white" size={15} />
              </div>
            </div>
          </div>
        ))}
      <CldUploadWidget
        options={{ multiple: true }}
        uploadPreset="k4nollw6"
        onUpload={(result: any) => onChange(result.info.secure_url)}
      >
        {({ open }) => (
          <div
            className={cn(
              'aspect-square flex justify-center items-center cursor-pointer border-4 border-black border-dashed rounded-md',
              !values.length ? 'w-52 md:w-72 lg:w-96' : 'w-20'
            )}
            onClick={() => open()}
          >
            <Plus size={22} />
          </div>
        )}
      </CldUploadWidget>
    </div>
  </div>
);
