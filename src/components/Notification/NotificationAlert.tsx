import React from 'react';
import { NotificationAlertBlock } from './NotificationAlert.tyles';

interface Props {
  title: string;
  body: string;
}

const NotificationAlert = ({ title, body }: Props) => {
  return (
    <NotificationAlertBlock>
      <span>{title}</span>
      <br />
      <span>{body}</span>
    </NotificationAlertBlock>
  );
};

export default NotificationAlert;
