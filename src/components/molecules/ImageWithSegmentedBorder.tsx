import * as React from 'react';
import { Image as RNImage, View } from 'react-native';
import styled from 'styled-components';
import { PieChart } from 'react-native-svg-charts';

interface ImageWithSegmentedBorderProps {
  url: string;
  borderSlices: number;
  borderColor: string;
  size: number;
}

const ImageContainer = styled(View)<{ size: number }>`
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Image = styled(RNImage)<{ size: number }>`
  width: ${({ size }) => size - size * 0.2}px;
  height: ${({ size }) => size - size * 0.2}px;
  border-radius: ${({ size }) => size}px;
`;

const SegmentedBorder = styled(PieChart)<{ size: number }>`
  height: ${({ size }) => size}px;
  width: 100%;
  position: absolute;
`;

export const ImageWithSegmentedBorder = ({
  url,
  borderSlices,
  borderColor,
  size = 100,
}: ImageWithSegmentedBorderProps) => {
  const pieData = new Array(borderSlices).fill(10).map((value, index) => ({
    value,
    svg: { fill: borderColor },
    key: `pie-${index}`,
  }));
  return (
    <ImageContainer size={size}>
      <SegmentedBorder
        data={pieData}
        outerRadius={'90%'}
        innerRadius={'86%'}
        size={size}
      />
      <Image source={{ uri: url }} size={size} />
    </ImageContainer>
  );
};
