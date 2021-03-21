import * as React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import styled from 'styled-components';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

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

const PickerContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
`;

const StyledInput = styled(TextInput)`
  border-bottom-color: ${({ theme }) => theme.colors.neutral60};
  border-bottom-width: 0.5px;
  width: 50%;
  color: ${({ theme }) => theme.colors.neutral40};
`;

const CountryCallingCode = styled(Text)`
  padding-left: 10px;
  padding-right: 5px;
`;

export const CellphoneInput = ({
  onChangePhone,
  onChangeCountry,
  phone,
  country,
}: CellphoneInputProps) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const onSelect = (selectedCountry: Country) => {
    onChangeCountry({
      code: selectedCountry.cca2,
      callingCode: selectedCountry.callingCode[0],
    });
  };
  return (
    <Row>
      <PickerContainer onPress={() => setIsVisible(!isVisible)}>
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
      />
    </Row>
  );
};
