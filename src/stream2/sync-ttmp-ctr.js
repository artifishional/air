import Token from './token';

const boiler = new Map();

export default new class TTMPSyncCTR {
  constructor() {
    this.order = 0;
    this.token = null;
    this.cbs = [];
  }

  // eslint-disable-next-line class-methods-use-this
  fromRawData({ sttmp, order = 0 }) {
    return { token: new Token(sttmp), order };
  }

  get(ttmp = -1) {
    if (ttmp !== -1) {
      if (!boiler.has(ttmp)) {
        boiler.set(ttmp, new Token(ttmp));
      }
      return boiler.get(ttmp);
    }
    if (!this.token) {
      // eslint-disable-next-line
      ttmp = globalThis.performance.now();
      this.token = new Token(ttmp);
      queueMicrotask(() => {
        this.order = 0;
        this.token = null;
        this.cbs.map((cb) => cb());
      });
    }
    this.order += 1;
    return { token: this.token, order: this.order };
  }

  async(cb) {
    this.get();
    this.cbs.push(cb);
  }
}();
