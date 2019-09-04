import {expect} from "chai"
import {series} from "../../utils.mjs"
import { stream2 as stream } from "../../index.mjs"

describe('controller', function () {

    test('simple callback', (done) => {
        const source = stream([], (e, controller) => {
            controller.onfullproxy( series(done, [
                e => expect(e).to.deep.equal({disconnect: false, request: 7}),
            ]));
            setTimeout(() => e(0) );
        });
        const hook = source.on(
          () => hook({ request: 7 })
        );
    });

});