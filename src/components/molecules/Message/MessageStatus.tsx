import * as React from 'react';
import { EMessageStatus } from '../../../app/Message';
import { EColor } from '../../../theme';
import { getKeyValue } from '../../../util';
import { Icon } from '../../atoms/Icon';

const messageStatusIconMap = {
  sent: 'check',
  read: 'double-check',
  received: 'double-check',
};

const messageStatusColorMap = {
  sent: EColor.neutral60,
  read: EColor.info,
  received: EColor.neutral60,
};

interface MessageStatusProps {
  status: keyof typeof EMessageStatus;
}

export const MessageStatus = ({ status }: MessageStatusProps) => (
  <Icon
    name={getKeyValue(status, messageStatusIconMap)}
    color={getKeyValue(status, messageStatusColorMap)}
    size={20}
  />
);
