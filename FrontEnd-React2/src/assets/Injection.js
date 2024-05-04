export class MyContext {
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
