import { useState } from 'react';

export default function useLoadingState(): [
  { isLoading: boolean },
  { startLoading: () => void; stopLoading: () => void },
] {
  const [isLoading, setIsLoading] = useState(true);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  return [{ isLoading }, { startLoading, stopLoading }];
}
