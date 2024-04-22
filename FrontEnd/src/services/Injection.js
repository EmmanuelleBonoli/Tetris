import { createContext, useContext, useEffect } from "react";

export class Context {
  map = new Map();

  get(klass) {
    let instance = this.map.get(klass);
    if (!instance) {
      // create singleton
      instance = new klass(this);
      this.map.set(klass, instance);
    }
    return instance;
  }

  set(klass, instance) {
    this.map.set(klass, instance);
  }
}

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
