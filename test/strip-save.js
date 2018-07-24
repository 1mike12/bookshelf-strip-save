const db = require("./database");
const User = require("./User");

before(async () =>{
    await db.refresh();
});

describe("strip save", function(){


    it("should strip away model's attributes not on the database", async () =>{
        let hadException = false;
        try {
            let mike = await User.forge({name: "mike", extraneousAttribute: "foo"}).save()
        } catch (e) {
            hadException = true;
        }
        expect(hadException).to.be.false;
    })

});