import Alert from "@/components/Alert";
import { cn } from "@/utils/StyleUtil";
import { FC, ReactNode, useEffect, useState } from "react";

import { createContext, useContext } from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface Alert {
  message: string;
  type?: AlertType;
}

interface AlertContextProps {
  showAlert: (message: string, type: AlertType) => void;
}
const AlertContext = createContext<AlertContextProps>({
  showAlert: () => {},
});

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alertMessages, setAlertMessages] = useState<Alert[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertMessages((prevItems) => {
        if (prevItems.length > 0) {
          return prevItems.slice(1);
        }
        return prevItems;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const contextValue: AlertContextProps = {
    showAlert: (message, type) => {
      const newAlert: Alert = {
        message,
        type,
      };
      setAlertMessages((prev) => [...prev, newAlert]);
    },
  };

  return (
    <AlertContext.Provider value={contextValue}>
      <main className="antialiased bg-transparent w-full h-[100dvh]">
        {children}
        {alertMessages.map((alert, index) => (
          <Alert
            key={index}
            className={`fixed right-10 bottom-10 transition-all w-fit duration-200 translate-x-5 ease-in-out alert alert-${alert.type}`}
          >
            {alert.type === "error" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn("shrink-0 stroke-current", "size-6")}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {alert.type === "warning" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn("shrink-0 stroke-current", "size-6")}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
            {alert.type === "info" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={cn("shrink-0 stroke-current", "size-6")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            )}
            {alert.type === "success" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn("shrink-0 stroke-current", "size-6")}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <span>{alert.message}</span>
          </Alert>
        ))}
      </main>
    </AlertContext.Provider>
  );
};
