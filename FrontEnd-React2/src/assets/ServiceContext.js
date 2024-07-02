import { createContext, useContext, useEffect } from "react";
// import { MyContext } from "./Injection";

export const ServiceContext = createContext(null);

export const useService = (klass) => {
  const context = useContext(ServiceContext);
  return context.get(klass);
};

export const useOnMount = (callback) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
