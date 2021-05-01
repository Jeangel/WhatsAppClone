import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text';
import { Modalize } from 'react-native-modalize';
import { usePushError } from '../../../state/error';
import ImageResizer from 'react-native-image-resizer';

const OptionContainer = styled(TouchableOpacity)`
  border: 0.5px solid ${({ theme }) => theme.colors.neutral60};
  height: 100px;
  width: 100px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const OptionsContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.surface};
  width: 100%;
  padding: 16px;
  height: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 40px;
`;

const CenteredColumn = styled(View)`
  align-items: center;
`;

interface OptionsProps {
  onImageSelected: (uri: string) => void;
  onError?: (error: Error) => void;
}

const resizeImage = (image: ImagePickerResponse) => {
  return ImageResizer.createResizedImage(
    image.uri as string,
    640,
    480,
    'JPEG',
    100,
  ).then((e) => {
    return e;
  });
};

const Options = ({ onImageSelected, onError }: OptionsProps) => {
  const handleOnPickFromGallery = () => {
    const onFinish = (response: ImagePickerResponse) => {
      if (response.uri) {
        resizeImage(response).then((image) => {
          onImageSelected(image.uri);
        });
      } else {
        if (typeof onError === 'function') {
          onError(
            new Error(
              'Something went wrong, could not get the image correctly, please try again',
            ),
          );
        }
      }
    };
    launchImageLibrary({ mediaType: 'photo' }, onFinish);
  };

  return (
    <OptionsContainer>
      <CenteredColumn>
        <OptionContainer>
          <Icon name="camera" size={40} color={'neutral60'} />
        </OptionContainer>
        <Text color="neutral60">Take a picture!</Text>
      </CenteredColumn>
      <CenteredColumn>
        <OptionContainer onPress={handleOnPickFromGallery}>
          <Icon name="gallery" size={40} color={'neutral60'} />
        </OptionContainer>
        <Text color="neutral60">Pick one from gallery!</Text>
      </CenteredColumn>
    </OptionsContainer>
  );
};

interface ImagePickerBottomSheetProps {
  onImageSelected: (uri: string) => void;
  isVisible: boolean;
  onIsVisibleChange: (newValue: boolean) => void;
}

export const ImagePickerBottomSheet = ({
  onImageSelected,
  onIsVisibleChange,
  isVisible,
}: ImagePickerBottomSheetProps) => {
  const pushError = usePushError();
  const bottomSheetRef = React.useRef<Modalize>(null);
  const handleOnChange = (uri: string) => {
    bottomSheetRef.current?.close();
    onImageSelected(uri);
  };

  const handleOnError = (error: Error) => {
    bottomSheetRef.current?.close();
    pushError(error);
  };

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible, onIsVisibleChange]);

  return (
    <Modalize
      ref={bottomSheetRef}
      modalHeight={250}
      onOverlayPress={() => onIsVisibleChange(false)}
      scrollViewProps={{ scrollEnabled: false }}>
      <Options onImageSelected={handleOnChange} onError={handleOnError} />
    </Modalize>
  );
};
