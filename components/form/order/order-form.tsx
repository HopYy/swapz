'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

import { Input } from '@/components/ui/input';
import { InputNumber } from '@/components/form/components/input-num-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ButtonsWrapper } from './components/button-wrapper';

const FormSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters long.' }),
  lastName: z
    .string()
    .min(3, { message: 'Last name must be at least 3 characters long.' }),
  address: z.string().min(1, { message: 'Please provide your address.' }),
  city: z.string().min(1, { message: 'Please provide your city.' }),
  postalCode: z
    .string()
    .min(1, { message: 'Please provide your postal code.' }),
  phone: z.string().min(1, { message: 'Please provide your phone number.' }),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  phone: '',
};

type DeliveryFormSchema = z.infer<typeof FormSchema>;

export const OrderForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<DeliveryFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = async (values: DeliveryFormSchema) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/order', values);
      window.location = response.data.url;
    } catch (error: any) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full pl-0">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First name..."
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full pl-0">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last name..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="mt-0" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full pl-0">
              <FormLabel>Street address</FormLabel>
              <FormControl>
                <Input placeholder="Address..." disabled={loading} {...field} />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full pl-0">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City..." disabled={loading} {...field} />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="w-full pl-0">
              <FormLabel>Postal code</FormLabel>
              <FormControl>
                <InputNumber
                  loading={loading}
                  placeholder="Postal code"
                  field={field}
                />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full pl-0">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <InputNumber
                  loading={loading}
                  placeholder="Phone number"
                  field={field}
                />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        <ButtonsWrapper loading={loading} />
      </form>
    </Form>
  );
};
