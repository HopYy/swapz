import { Spinner } from '@/components/loading';

export default function Loading() {
  return (
    <div className="flex-1 h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
