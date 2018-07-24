const strip = require('../stripExtraneousAttributes')

describe("strip attributes", function(){


    it("should strip ", async () =>{
        let whitelist = new Set(["cougar", "lion"])
        let attributes = {
            cougar: true,
            lion: true,
            hound: true,
            wasp: true
        }
        strip(whitelist, attributes);
        expect(attributes.hound).to.be.undefined;
        expect(attributes.cougar).to.be.true;
    })

});