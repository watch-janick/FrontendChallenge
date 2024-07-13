import { useMemo } from "react";

interface PredictionProps<T> {
  data: T[] | undefined | null;
  isLoading: boolean;
  countPrediction: number;
}

export const usePrediction = <T,>({
  data,
  isLoading,
  countPrediction,
}: PredictionProps<T>): T[] => {
  return useMemo(() => {
    if (isLoading) {
      return Array(countPrediction).fill(null) as T[];
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  }, [isLoading, countPrediction, data]);
};
