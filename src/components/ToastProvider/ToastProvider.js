import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    { id: crypto.randomUUID(), message: 'oh no', variant: 'error' },
    { id: crypto.randomUUID(), message: 'that worked', variant: 'success' },
  ]);
  React.useEffect(() => {
    function removeToasts(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }
    window.addEventListener('keydown', removeToasts);

    return () => {
      window.removeEventListener('keydown', removeToasts);
    };
  }, []);
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
