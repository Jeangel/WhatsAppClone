import React, { useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import { Icon } from './Icon';
import { Text } from './Text';

const Container = styled(TouchableOpacity)`
  border: 0.5px solid ${({ theme }) => theme.colors.neutral60};
  height: 100px;
  width: 100px;
  border-radius: 20px;
`;

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
  z-index: 10;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 40px;
`;

const Background = styled(View)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 5;
`;

const CenteredColumn = styled(View)`
  align-items: center;
`;

const Options = () => {
  const handleOnUploadImagePress = () => {
    const onFinish = (response: ImagePickerResponse) => {
      console.log(response);
    };
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      onFinish,
    );
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
        <OptionContainer onPress={handleOnUploadImagePress}>
          <Icon name="gallery" size={40} color={'neutral60'} />
        </OptionContainer>
        <Text color="neutral60">Upload an image!</Text>
      </CenteredColumn>
    </OptionsContainer>
  );
};

export const ImagePicker = () => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapTo(0);
    } else {
      bottomSheetRef.current?.snapTo(1);
    }
  }, [isVisible]);

  const handleOnPress = () => {
    setIsVisible(true);
  };

  const onPressOutside = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Container onPress={handleOnPress} />
      {isVisible && (
        <TouchableWithoutFeedback onPress={onPressOutside}>
          <Background />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        borderRadius={10}
        snapPoints={[400, 0]}
        renderContent={Options}
        initialSnap={1}
      />
    </>
  );
};
