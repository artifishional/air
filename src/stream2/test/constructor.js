import { stream2 as stream } from '../stream';
import { async } from '../../utils';
import { EMPTY_FUNCTION } from '../defs';
import RedWSPSlave from '../wsp/rwsp-slave';
import RedWSP from '../wsp/rwsp';

// eslint-disable-next-line
const { describe, test, expect } = globalThis;

describe('constructor', () => {
  test('reconnect', () => {
    // eslint-disable-next-line no-undef
    const proJ = jest.fn();
    const _ = async();
    const s1 = stream
      .fromCbFunc((cb) => {
        cb(1);
        _(() => cb(2));
      });
    s1
      .get(({ value }) => proJ(value));
    _(() => setTimeout(() => {
      expect(proJ.mock.calls).toEqual([
        [1],
        [2],
      ]);
    }));
  });

  test('master does not recreate a hnProJ on init', () => {
    // eslint-disable-next-line no-undef
    const hnProJ = jest.fn(() => EMPTY_FUNCTION);
    RedWSP.create(null, hnProJ, { initialValue: 0 });
    expect(hnProJ).toHaveBeenCalledTimes(1);
  });

  test('slave does not recreate a hnProJ on init', () => {
    // eslint-disable-next-line no-undef
    const hnProJ = jest.fn(() => EMPTY_FUNCTION);
    const rwsp = RedWSP.create(null, () => EMPTY_FUNCTION, { initialValue: 0 });
    RedWSPSlave.create([rwsp], hnProJ);
    expect(hnProJ).toHaveBeenCalledTimes(1);
  });
});
