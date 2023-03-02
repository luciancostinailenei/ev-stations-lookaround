import { useMemo } from "react";
import { Stack, Skeleton } from "@chakra-ui/react";

const SkeletonStack = ({
  skeletonsNumber,
  width,
  height,
}: {
  skeletonsNumber: number;
  width: string;
  height: string;
}) => {
  const Skeletons = () => {
    let skeletons: Array<JSX.Element> = [];
    for (let i = 0; i < skeletonsNumber; i++) {
      const skeleton = (
        <Skeleton
          startColor="gray.100"
          endColor="gray.300"
          width={width}
          height={height}
          key={`skeleton-${i}`}
        />
      );

      skeletons = [...skeletons, skeleton];
    }

    return skeletons;
  };

  const skeletons = useMemo(Skeletons, [skeletonsNumber, width, height]);
  return <Stack>{skeletons}</Stack>;
};

export default SkeletonStack;
