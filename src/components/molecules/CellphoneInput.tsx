import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import styled from 'styled-components';
import { useTheme } from '../../hooks';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';
import { TextInput } from '../atoms/TextInput';

interface CellphoneInputProps {
  onChangePhone: (phone: string) => void;
  onChangeCountry: ({
    code,
    callingCode,
  }: {
    code: string;
    callingCode: string;
  }) => void;
  phone: string;
  country: {
    code: string;
    callingCode: string;
  };
}

const Row = styled(View)`
  flex-direction: row;
`;

const PickerContainer = styled(TouchableOpacity)<{ borderColor: string }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  border: 0.5px solid ${({ borderColor }) => borderColor};
  border-right-width: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-left: 10px;
`;

const StyledInput = styled(TextInput)`
  border-width: 0.5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 50%;
  color: ${({ theme }) => theme.colors.neutral40};
`;

const CountryCallingCode = styled(Text)`
  padding-left: 10px;
`;

export const CellphoneInput = ({
  onChangePhone,
  onChangeCountry,
  phone,
  country,
}: CellphoneInputProps) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [borderColor, setBorderColor] = React.useState(theme.colors.neutral60);
  const onSelect = (selectedCountry: Country) => {
    onChangeCountry({
      code: selectedCountry.cca2,
      callingCode: selectedCountry.callingCode[0],
    });
  };
  const handleOnFocus = () => {
    setBorderColor(theme.colors.primary);
  };
  const handleOnBlur = () => {
    setBorderColor(theme.colors.neutral60);
  };
  return (
    <Row>
      <PickerContainer
        onPress={() => setIsVisible(!isVisible)}
        borderColor={borderColor}>
        <CountryPicker
          onSelect={onSelect}
          countryCode={country.code as CountryCode}
          onClose={() => setIsVisible(false)}
          visible={isVisible}
          withFilter
        />
        <Icon name="chevron-down" size={15} color="neutral60" />
        {country.callingCode && (
          <CountryCallingCode>+{country.callingCode}</CountryCallingCode>
        )}
      </PickerContainer>
      <StyledInput
        placeholder="Enter Cellphone Number"
        keyboardType="decimal-pad"
        value={phone}
        onChangeText={(text) => onChangePhone(text.replace(/\D/g, ''))}
        maxLength={10}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
      />
    </Row>
  );
};
