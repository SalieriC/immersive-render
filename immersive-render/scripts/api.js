export class api {

    // Exposing the globnals.
    static registerFunctions() {
        console.log("IR API initialised.")
        api.globals()
    }

    // Setting symbols globally exposed.
    static globals() {
        globalThis['ir'] = {
            play_sfx: api._play_sfx,
        }
    }

    static async _play_sfx(sfx, volume, playForAll = false) {
        if (!sfx) {
            console.error(game.i18n.localize("IR.missingSoundFile"))
        }
        if (!volume) {
            volume = game.settings.get('ir', 'defaultVolume')
        }
        AudioHelper.play({ src: `${sfx}`, volume: volume, loop: false }, playForAll);
    }
}