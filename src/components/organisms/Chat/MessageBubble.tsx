import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BubbleProps, IMessage, Bubble } from 'react-native-gifted-chat';
import { ITheme } from '../../../theme';
import { useTheme } from '../../../hooks';

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    rightContainer: {
      maxWidth: '80%',
    },
    leftContainer: {
      maxWidth: '80%',
    },
    rightWrapper: {
      backgroundColor: theme.colors.primary,
      padding: 8,
    },
    leftWrapper: {
      backgroundColor: theme.colors.neutral80,
      padding: 8,
    },
    rightText: {
      color: theme.colors.white,
    },
    leftText: {
      color: theme.colors.neutral40,
    },
  });

interface MessageBubbleProps extends BubbleProps<IMessage> {}

export const MessageBubble = (props: MessageBubbleProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <Bubble
      {...props}
      containerStyle={{
        right: styles.rightContainer,
        left: styles.leftContainer,
      }}
      wrapperStyle={{
        right: styles.rightWrapper,
        left: styles.leftWrapper,
      }}
      textStyle={{
        right: styles.rightText,
        left: styles.leftText,
      }}
    />
  );
};
