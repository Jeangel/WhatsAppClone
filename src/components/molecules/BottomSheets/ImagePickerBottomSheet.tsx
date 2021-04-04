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
}

const Options = ({ onImageSelected }: OptionsProps) => {
  const handleOnPickFromGallery = () => {
    const onFinish = (response: ImagePickerResponse) => {
      console.log(response);
      if (response.uri) {
        onImageSelected(response.uri);
      } else {
        console.log('OMG!!! NO URI!!!');
        // TODO show error?
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
}

export const ImagePickerBottomSheet = ({
  onImageSelected,
  isVisible,
}: ImagePickerBottomSheetProps) => {
  const bottomSheetRef = React.useRef<Modalize>(null);
  const handleOnChange = (uri: string) => {
    bottomSheetRef.current?.close();
    onImageSelected(uri);
  };

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <Modalize
      ref={bottomSheetRef}
      modalHeight={250}
      withReactModal
      scrollViewProps={{ scrollEnabled: false }}>
      <Options onImageSelected={handleOnChange} />
    </Modalize>
  );
};
