
export class MyContext {
    map = new Map();
  
    get<T>(klass: new (context: MyContext) => T): T | undefined  {
      let instance = this.map.get(klass);
      if (!instance) {
        // create singleton
        instance = new klass(this);
        this.map.set(klass, instance);
      }
      return instance;
    }
  
    set<T>(klass: new (context: MyContext) => T, instance: T){
      this.map.set(klass, instance);
    }
  }
  