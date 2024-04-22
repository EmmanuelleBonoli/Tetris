import { EventEmitter } from "eventemitter3";

export class Service extends EventEmitter {
  constructor(context) {
    super();
    this.context = context;
  }

  inject(klass) {
    return this.context.get(klass);
  }
}
