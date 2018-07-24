const db = require("../test_helpers/database");
const User = require("../test_helpers/User");

before(async () =>{
    await db.latestMigrations();
});

describe("strip save", function(){


    it("should fail because dependent plugin not loaded", async () =>{
        let hadException = false;
        try {
            let mike = await User.forge({name: "mike", extraneousAttribute: "foo"}).save()
        } catch (e) {
            hadException = true;
        }
        expect(hadException).to.be.true;
    })

    it("should strip away model's attributes not on the database", async () =>{
        db.bookshelf.plugin(require("bookshelf-column-cache"))
        let hadException = false;
        try {
            let mike = await User.forge({name: "mike", extraneousAttribute: "foo"}).save()
        } catch (e) {
            hadException = true;
        }
        expect(hadException).to.be.true;
    })

});