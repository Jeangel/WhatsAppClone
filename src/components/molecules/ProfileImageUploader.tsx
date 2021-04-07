import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Bar } from 'react-native-progress';
import { useTheme, useUploadImage } from '../../hooks';
import { usePushError } from '../../state/error';
import { ImagePickerBottomSheet } from './BottomSheets/ImagePickerBottomSheet';

const Container = styled(TouchableOpacity)`
  border: 0.5px solid ${({ theme }) => theme.colors.neutral60};
  height: 100px;
  width: 100px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 20px;
`;

interface ProfileImageUploaderProps {
  onUploadStatusChange: (wasImageUploaded: boolean) => void;
  imageId: string;
}

export const ProfileImageUploader = ({
  imageId,
  onUploadStatusChange,
}: ProfileImageUploaderProps) => {
  const [bottomSheetIsVisible, setBottomSheetIsVisible] = React.useState(false);
  const [imageUri, setImageUri] = React.useState('');
  const [imageUploadProgress, setImageUploadProgress] = React.useState(0);
  const [uploadIsComplete, setUploadIsComplete] = React.useState(false);
  const theme = useTheme();
  const pushError = usePushError();
  const uploadImage = useUploadImage({
    onProgress: setImageUploadProgress,
    onError: pushError,
  });

  React.useEffect(() => {
    if (imageUploadProgress === 1) {
      setUploadIsComplete(true);
      setImageUploadProgress(0);
    }
  }, [imageUploadProgress]);

  React.useEffect(() => {
    onUploadStatusChange(uploadIsComplete);
  }, [uploadIsComplete, onUploadStatusChange]);

  const handleOnPress = () => {
    setBottomSheetIsVisible(true);
  };

  const handleOnImageSelected = (uri: string) => {
    setBottomSheetIsVisible(false);
    setUploadIsComplete(false);
    setImageUri(uri);
    if (imageId) {
      uploadImage({
        imageNameReference: `profile-image-${imageId}`,
        localImageUri: uri,
      });
    }
  };

  return (
    <>
      <Container onPress={handleOnPress}>
        {!!imageUploadProgress && !uploadIsComplete && (
          <Bar
            width={80}
            progress={imageUploadProgress}
            color={theme.colors.primary}
          />
        )}
        {uploadIsComplete && <ProfileImage source={{ uri: imageUri }} />}
      </Container>
      <ImagePickerBottomSheet
        onImageSelected={handleOnImageSelected}
        isVisible={bottomSheetIsVisible}
        onIsVisibleChange={setBottomSheetIsVisible}
      />
    </>
  );
};
