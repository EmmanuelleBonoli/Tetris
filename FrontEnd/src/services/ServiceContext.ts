import { createContext, useContext, useEffect } from "react";
import { MyContext } from "./Injection";
import { UserService } from "./Typage/TypeUserService";

export const ServiceContext = createContext<MyContext | null>(null);

export const useService = (klass): UserService =>
  // <T>(klass: new (context: MyContext) => T): T | undefined
  {
    const context = useContext(ServiceContext);
    // if (!context) return undefined;
    return context.get(klass);
  };

export const useOnMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
