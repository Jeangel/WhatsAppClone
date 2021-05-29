import * as React from 'react';
import { View, StyleProp, ImageStyle } from 'react-native';
import styled from 'styled-components';
import { Circle } from 'react-native-progress';
import Image from 'react-native-image-progress';
import { useTheme } from '../../../hooks';

interface UserImageProps {
  url: string;
  status?: string;
  size?: number;
}

const Container = styled(View)`
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(Image)<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;

const ImageContainer = styled(View)`
  position: relative;
`;

const Status = styled(View)<{ status: string; size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 100px;
  position: absolute;
  bottom: 4px;
  right: 0px;
  border: 1.5px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'online':
        return theme.colors.primary;
      case 'offline':
        return theme.colors.neutral60;
      case 'away':
        return theme.colors.warning;
    }
  }};
`;

export const UserImage = ({ url, status, size = 60 }: UserImageProps) => {
  const theme = useTheme();

  const imageStyle: StyleProp<ImageStyle> = {
    borderRadius: 100,
  };

  return (
    <Container>
      <ImageContainer>
        <ProfileImage
          size={size}
          source={{ uri: url }}
          imageStyle={imageStyle}
          indicator={Circle}
          indicatorProps={{
            color: theme.colors.primary,
            style: { height: size, width: size },
          }}
        />
        {!!status && <Status status={status} size={size * 0.2} />}
      </ImageContainer>
    </Container>
  );
};
