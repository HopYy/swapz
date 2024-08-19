'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface useToggleApiProps {
  api: string;
  method: 'post' | 'delete';
  message?: string;
}

export const useToggleApi = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleAction = async ({ api, method, message }: useToggleApiProps) => {
    try {
      setLoading(true);
      await axios[method](api);
      if (message) {
        toast.success(message);
      }
      router.refresh();
    } catch (error) {
      console.error('API request error:', error);
      toast.error('Something went wrong');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return { loading, toggleAction };
};
