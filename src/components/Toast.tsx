import React, { memo } from 'react';
import styled from 'styled-components';

export type ToastStatusType = 'success' | 'info' | 'danger';
export interface ToastProps {
  id: string;
  title: string;
  content?: string;
  status?: ToastStatusType;
}

export const Toast = memo(({ title, content, status = 'info' }: ToastProps) => {
  return (
    <StyledToast status={status}>
      <Title>{title}</Title>
      {content && <Content>{content}</Content>}
    </StyledToast>
  );
});

const getColorByStatus = (status: string) => {
  switch (status) {
    case 'success':
      return '#13aa2d';
    case 'danger':
      return '#c52b45';
    case 'info':
      return '#185ec7';
    default:
      return '';
  }
};

const StyledToast = styled.div<{
  status: string;
}>`
  width: 254px;
  background-color: #fff;
  color: #333;
  padding: 0.5rem 0.6rem;
  margin-top: 12px;
  border-left: 5px solid ${(props) => getColorByStatus(props.status)};
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 1);
`;

const Title = styled.h5`
  margin: 0 0 6px 0;
`;

const Content = styled.p`
  margin: 0;
  font-size: 0.85rem;
`;
