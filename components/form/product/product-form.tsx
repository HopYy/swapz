'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Store } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { ImageUpload } from './components/image-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button-component';
import { Checkbox } from '@/components/ui/checkbox';
import { InputNumber } from '@/components/form/components/input-num-form';
import {
  CategoriesBox,
  ConditionsBox,
  ShippingBox,
} from './components/combobox-values';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Product } from '@/utils/types';

const FormSchema = z.object({
  title: z.string().min(5).max(200),
  price: z.coerce.number().min(1).max(999999).nonnegative(),
  description: z.string().min(20).max(2000),
  returnItem: z.boolean().default(false),
  images: z
    .object({ url: z.string() })
    .array()
    .refine((data) => data.length > 0, {
      message: 'Image is required',
    }),
  category: z.string().refine((data) => data !== '', {
    message: 'Select category',
  }),
  condition: z.string().refine((data) => data !== '', {
    message: 'Select condition',
  }),
  shipping: z.string().refine((data) => data !== '', {
    message: 'Please select shipping method',
  }),
});

interface ProductFormProps {
  data?: Product | null;
}

type ProductFormSchema = z.infer<typeof FormSchema>;

export const ProductForm: React.FC<ProductFormProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultValues = data
    ? data
    : {
        title: '',
        category: '',
        condition: '',
        description: '',
        returnItem: false,
        shipping: '',
        price: 0,
        images: [],
      };

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProductFormSchema) => {
    try {
      setLoading(true);
      if (data) {
        await axios.patch(`/api/products/${data.id}`, values);
      } else {
        await axios.post('/api/products', values);
      }
      router.refresh();
      form.reset();
      toast.success(data ? 'Product updated' : 'Product created');
    } catch (error: any) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex items-center gap-2 my-7">
        <Store size={20} />
        <h1 className="text-xl font-bold">
          {data ? 'Edit product' : 'Create your product'}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center max-lg:flex-col">
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-lg font-bold mb-5">General information</h1>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-semibold">
                      Name product
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="title..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-semibold">
                      Description product
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-80"
                        placeholder="description..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-wrap max-lg:justify-center gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-center">
                          Base price
                        </FormLabel>
                        <FormControl>
                          <InputNumber
                            loading={loading}
                            field={field}
                            placeholder="euro"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shipping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-center">
                          Shipping options
                        </FormLabel>
                        <FormControl>
                          <ShippingBox
                            value={field.value}
                            disabled={loading}
                            onChange={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-wrap max-lg:justify-center gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-center">
                          Product category
                        </FormLabel>
                        <FormControl>
                          <CategoriesBox
                            value={field.value}
                            disabled={loading}
                            onChange={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-center">
                          Product condition
                        </FormLabel>
                        <FormControl>
                          <ConditionsBox
                            value={field.value}
                            disabled={loading}
                            onChange={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="p-4">
                <FormField
                  control={form.control}
                  name="returnItem"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 my-10 max-lg:justify-center">
                      <FormControl>
                        <Checkbox
                          defaultChecked={data?.returnItem || false}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Enable product returns for dissatisfied customers
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="h-fit p-4">
              <h1 className="text-lg font-bold mb-5 text-center">
                Upload image
              </h1>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        values={field.value.map((image) => image.url)}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url !== url
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="my-10 flex justify-center">
            <Button
              type="submit"
              disabled={loading || !form.formState.isValid}
              spinner={false}
              onClick={() => {
                if (form.formState.isValid) {
                  router.push('/dashboard/my-products');
                }
              }}
            >
              <span className="text-white text-sm font-semibold tracking-wide">
                {data ? 'Edit product' : 'Create product'}
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
