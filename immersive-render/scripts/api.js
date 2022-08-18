export class api {

    // Exposing the globnals.
    static registerFunctions() {
        console.log("IR API initialised.")
        api.globals()
    }

    // Setting symbols globally exposed.
    static globals() {
        globalThis['ir'] = {
            foo: api._foo,
        }
    }

    static async _foo() {
        console.log(game.i18n.localize("IR.foo"))
    }
}