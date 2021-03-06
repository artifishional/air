import { keyF, stream } from '../../index.mjs';
import { series } from '../../utils.mjs';

class Socket {

  constructor () {
    this.obs = [];
  }

  on (obs) {
    this.obs.push(obs);
    setTimeout(() => obs({
      action: 'initialize',
      state: {
        mass: [1, 5, 6, 7, 20],
        rnm: 2
      }
    }));
  }

  off (obs) {
    this.obs.splice(this.obs.indexOf(obs), 1);
  }

  send (data) {
    setTimeout(() => this.obs.map(obs => obs(data)));
  }

}

/*
describe('1.', function () {

    it('a)', (done) => {

        const srv = new Observable(function ({ push }) {

            const socket = new Socket();
            socket.on( function ( {action, __sid__ = -1, ...data} ) {

                if(action === "ok") {
                    push(  );
                }

            } );

            return ( {action, data} ) => {
                socket.send( { action, ...args } );
            }
        });

    });

});*/

describe('complicated', () => {

  test('stream reopening', (done) => {

    done = series(done, [
      evt => expect(evt).toEqual(keyF),
      evt => expect(evt).toBe('a1'),
      evt => expect(evt).toBe('b2'),
      evt => expect(evt).toBe('c3'),
      evt => expect(evt).toBe('d4'),
      evt => expect(evt).toEqual(keyF),
      evt => expect(evt).toBe('a1'),
      evt => expect(evt).toBe('b2'),
      evt => expect(evt).toBe('c3'),
      evt => expect(evt).toBe('d4'),
    ]);

    const source = stream(emt => {
      emt('a1');
      emt('b2');
      emt('c3');
      emt('d4');
    });

    const hook = source.on(done);
    setTimeout(() => {
      hook();
      source.on(done);
    }, 10);

  });

});