import React, { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Toast, ToastStatusType, ToastProps } from 'components';
import styled from 'styled-components';

type addFnType = (
  title: string,
  content: string,
  status?: ToastStatusType,
) => void;
interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastContext = React.createContext<{
  add: addFnType;
}>({
  add: () => {},
});

export function ToastProvider({ children }: ToastProviderProps) {
  const DEFAULT_TOAST_TIME = 5000;
  const [toastItems, setToastItems] = useState<ToastProps[]>([]);

  const generateToastId = () =>
    `${Math.random().toString(36)}${new Date().getTime()}`;
  const add: addFnType = (title, content, status) => {
    const newToast = {
      id: generateToastId(),
      title,
      content,
      status,
    };
    setToastItems((prevItems) => [...prevItems, newToast]);

    //toast auto close
    setTimeout(() => {
      setToastItems((prevItems) =>
        prevItems.filter((n) => n.id !== newToast.id),
      );
    }, DEFAULT_TOAST_TIME);
  };

  return (
    <ToastContext.Provider value={{ add }}>
      {children}
      {createPortal(
        <StyledToastContainer>
          {toastItems.map((n) => (
            <Toast
              key={n.id}
              id={n.id}
              title={n.title}
              content={n.content}
              status={n.status}
            />
          ))}
        </StyledToastContainer>,
        document.body || null,
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  const { add } = ctx;

  return {
    add,
  };
};

const StyledToastContainer = styled.div`
  position: fixed;
  bottom: 15px;
  right: 15px;
`;
