import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import { Icon } from './Icon';

const Container = styled(TouchableOpacity)`
  border: 1px solid ${({ theme }) => theme.colors.neutral80};
  height: 100px;
  width: 100px;
  border-radius: 20px;
`;

const OptionContainer = styled(TouchableOpacity)`
  border: 1px solid ${({ theme }) => theme.colors.neutral80};
  height: 60px;
  width: 60px;
  border-radius: 10px;
  margin: 20px;
`;

const OptionsContainer = styled(View)`
  flex-direction: row;
`;

const Options = () => {
  return (
    <OptionsContainer>
      <OptionContainer>
        <Icon name="camera" size={30} color={'neutral40'} />
      </OptionContainer>
      <OptionContainer>
        <Icon name="gallery" size={30} color={'neutral40'} />
      </OptionContainer>
    </OptionsContainer>
  );
};

export const ImagePicker = () => {
  const bottomSheetRef = React.useRef(null);
  const handleOnPress = () => {};
  return (
    <>
      <Container onPress={handleOnPress} />
      <BottomSheet
        ref={bottomSheetRef}
        borderRadius={10}
        snapPoints={[450, 300, 0]}
        renderContent={Options}
      />
    </>
  );
};
