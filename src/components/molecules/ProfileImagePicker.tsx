import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { ImagePickerBottomSheet } from './BottomSheets/ImagePickerBottomSheet';

const Container = styled(TouchableOpacity)`
  border: 0.5px solid ${({ theme }) => theme.colors.neutral60};
  height: 100px;
  width: 100px;
  border-radius: 20px;
`;
interface ProfileImagePickerProps {
  onImageSelected: (uri: string) => void;
}

export const ProfileImagePicker = ({
  onImageSelected,
}: ProfileImagePickerProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOnPress = () => {
    setIsVisible(true);
  };

  const handleOnImageSelected = (uri: string) => {
    setIsVisible(false);
    onImageSelected(uri);
  };

  return (
    <>
      <Container onPress={handleOnPress} />
      <ImagePickerBottomSheet
        onImageSelected={handleOnImageSelected}
        isVisible={isVisible}
      />
    </>
  );
};
