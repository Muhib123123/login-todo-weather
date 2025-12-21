import { createContext, useContext, useState } from "react";

type ToastContextValue = {
  handleToastContext: (value: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState({ value: "", show: false });
  const [counter, setCounter] = useState<number[]>([]);
  const handleToastContext = (value: string) => {
    setToast((prev) => ({ ...prev, value, show: true }));
    setCounter((prev) => [...prev, 1]);
    setTimeout(() => {
      setToast((prev) => ({ ...prev, value, show: false }));
      setCounter((prev) => prev.slice(1));
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ handleToastContext }}>
      {children}
      <div className="toast-container">
        {counter.map((_, index) => (
          <div key={index} className="toast">
            {toast.value}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  return useContext(ToastContext);
};
