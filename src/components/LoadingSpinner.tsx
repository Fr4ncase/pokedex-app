// Node modules
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Loader2
        className='h-10 w-10 animate-spin text-text-body'
        aria-label='Cargando'
      />
    </div>
  );
};
