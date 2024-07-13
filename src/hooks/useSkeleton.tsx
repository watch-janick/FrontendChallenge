import get from "lodash.get";
import React, { useMemo } from "react";

interface SkeletonOptions<T> {
  isLoading: boolean;
  data: Partial<T> | undefined;
  prediction: Partial<T>;
  displayPartial?: boolean;
}

interface SkeletonProps {
  value: string;
  children?: ((value: any) => React.ReactNode) | React.ReactNode;
}

const LoadingSkeleton = ({ content }: { content: React.ReactNode }) => (
  <span className="inline-block bg-gray-400 rounded leading-none animate-pulse">
    <span className="invisible">{content}</span>
  </span>
);

export const useSkeleton = <T,>({
  isLoading,
  data,
  prediction,
  displayPartial = false,
}: SkeletonOptions<T>) => {
  const Skeleton = useMemo(() => {
    const SkeletonComponent = ({ value, children }: SkeletonProps) => {
      const dataValue = get(data, value);
      const predictionValue = get(prediction, value);

      if (!isLoading || (displayPartial && dataValue !== undefined)) {
        if (typeof children === "function") {
          return children(dataValue);
        }
        return dataValue as React.ReactNode;
      }
      return <LoadingSkeleton content={predictionValue} />;
    };

    SkeletonComponent.displayName = "Skeleton";

    return SkeletonComponent;
  }, [isLoading, data, prediction, displayPartial]);

  return Skeleton;
};
