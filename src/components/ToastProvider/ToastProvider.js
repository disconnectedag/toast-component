import React from 'react';
import useKeydown from '../../hooks/use-keydown';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    { id: crypto.randomUUID(), message: 'oh no', variant: 'error' },
    { id: crypto.randomUUID(), message: 'that worked', variant: 'success' },
  ]);

  const handleCallback = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', handleCallback);

  function handleDismiss(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        handleDismiss,
        toasts,
        createToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
