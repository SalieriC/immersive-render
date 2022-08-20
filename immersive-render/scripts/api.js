export class api {

    // Exposing the globnals.
    static registerFunctions() {
        console.log("IR API initialised.")
        api.globals()
    }

    // Setting symbols globally exposed.
    static globals() {
        globalThis['ir'] = {
            play_audio: api._play_audio,
            get_audio: api._get_audio_files_from_folder,
            randomise_file: api._randomise_file,
            play_random_audio: api._play_random_audio,
            get_flags: api._get_ir_flags,
            set_flags: api._set_ir_flags,
            unset_flags: api._unset_ir_flags,
            configure_entity: api._configure_entity,
            configure_folder: api._configure_folder
        }
    }

    static async _play_audio(audioPath, volume, playForAll = false) {
        if (!audioPath) {
            console.error(game.i18n.localize("IR.error-missingSoundFile"))
            return;
        }
        if (!volume || volume === -1) {
            volume = game.settings.get('immersive-render', 'defaultVolume')
        }
        AudioHelper.play({ src: `${audioPath}`, volume: volume, loop: false }, playForAll);
    }

    static async _get_audio_files_from_folder(pathToFolder) {
        if (!pathToFolder) {
            console.error(game.i18n.localize("IR.error-missingFolderPath"))
            return;
        }
        // Thanks at Zhell#9201 for the code to get files from a folder and the filtering for extensions.
        let browse
        let files
        const EXT = [".ogg", ".mp3", ".flac", ".webm", ".wav"]
        if (pathToFolder.includes("*")) {
            browse = await FilePicker.browse("data", pathToFolder, {extensions: EXT, wildcard: true});
        } else {
            browse = await FilePicker.browse("data", pathToFolder, {extensions: EXT})
        }
        files = browse.files
        return files
    }

    static async _randomise_file(filePathsArray) {
        if (!filePathsArray) {
            console.error(game.i18n.localize("IR.error-missingFolderPath"))
            return;
        }
        const FILE = filePathsArray[Math.floor(Math.random() * filePathsArray.length)];
        return FILE;
    }

    static async _play_random_audio(pathToFolder, volume, playForAll) {
        if (!pathToFolder) {
            console.error(game.i18n.localize("IR.error-missingFolderPath"))
            return;
        }
        let files = await ir.get_audio(pathToFolder)
        let randomAudioFile = await ir.randomise_file(files)
        ir.play_audio(randomAudioFile, volume, playForAll)
    }

    static async _get_ir_flags(entity) {
        let currOpenPath = entity.getFlag('immersive-render', 'onRenderSfxFolder')
        let currClosePath = entity.getFlag('immersive-render', 'onCloseSfxFolder')
        let currVolume = entity.getFlag('immersive-render', 'volume')
        return { currOpenPath, currClosePath, currVolume }
    }

    static async _set_ir_flags(entity, openFolder, closeFolder, volume = -1, message = true) {
        const DATA = {
            flags: {
                ["immersive-render"]: {
                    onRenderSfxFolder: openFolder,
                    onCloseSfxFolder: closeFolder,
                    volume: volume
                }
            }
        }
        try { 
            entity.update(DATA)
            if (message) { ui.notifications.notify(game.i18n.format("IR.notification-flagsSet", {entityName: entity.name})) }
            console.log(`Flags set on ${entity.name}.`, entity)
        }
        catch (err) {
            ui.notifications.notify(game.i18n.format("IR.error-flagsNotSet", {entityName: entity.name}))
            console.log(err)
        }
    }

    static async _unset_ir_flags(entity, message = true) {
        try {
            // I remove the flags completely instead of unsetting them to avoid data clutter:
            entity.update({ "flags.-=immersive-render": null })
            if (message) { ui.notifications.notify(game.i18n.format("IR.notification-flagsUnset", {entityName: entity.name})) }
            console.log(`Flags removed from ${entity.name}.`, entity)
        }
        catch (err) {
            ui.notifications.notify(game.i18n.format("IR.error-flagsNotUnset", {entityName: entity.name}))
            console.log(err)
        }
    }

    static async _configure_entity(entity) {
        // Get IR Flags:
        let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
        if (!currOpenPath) { currOpenPath = "" }
        if (!currClosePath) { currClosePath = "" }
        if (!currVolume) { currVolume = -1 }
        new Dialog({
            title: game.i18n.localize("IR.contextual-renderOptions"),
            content: game.i18n.format("IR.dialogue-renderOptionsContent", {openFolder: currOpenPath, closeFolder: currClosePath, volume: currVolume}),
            buttons: {
                one: {
                    label: `<i class="fas fa-check"></i> ${game.i18n.localize("IR.dialogue-renderOptionsSetFlags")}`,
                    callback: async (html) => {
                        //const path = html.find("[name=folder-path").val();
                        const OPEN_FOLDER = String(html.find(`#openFolder`).val())
                        const CLOSE_FOLDER = String(html.find(`#closeFolder`).val())
                        const VOLUME = Number(html.find(`#volume`)[0].value)
                        const MESSAGE = true
                        await ir.set_flags(entity, OPEN_FOLDER, CLOSE_FOLDER, VOLUME, true)
                    }
                },
                two: {
                    label: `<i class="fas fa-trash"></i> ${game.i18n.localize("IR.dialogue-renderOptionsUnsetFlags")}`,
                    callback: async (_) => {
                        await ir.unset_flags(entity, true)
                    }
                },
            },
            render: api.listener
        }, {width: 500}).render(true)
    }

    static async _configure_folder(folder) {
        new Dialog({
            title: game.i18n.localize("IR.contextual-renderOptions"),
            content: game.i18n.localize("IR.dialogue-renderOptionsContentFolder"),
            buttons: {
                one: {
                    label: `<i class="fas fa-check"></i> ${game.i18n.localize("IR.dialogue-renderOptionsSetFlags")}`,
                    callback: async (html) => {
                        //const path = html.find("[name=folder-path").val();
                        const OPEN_FOLDER = String(html.find(`#openFolder`).val())
                        const CLOSE_FOLDER = String(html.find(`#closeFolder`).val())
                        const VOLUME = Number(html.find(`#volume`)[0].value)
                        for (let entity of folder.contents) {
                            await ir.set_flags(entity, OPEN_FOLDER, CLOSE_FOLDER, VOLUME, false)
                        }
                        ui.notifications.notify(game.i18n.format("IR.notification-flagsSetFolder", {folderName: folder.name}))
                    }
                },
                two: {
                    label: `<i class="fas fa-trash"></i> ${game.i18n.localize("IR.dialogue-renderOptionsUnsetFlags")}`,
                    callback: async (_) => {
                        for (let entity of folder.contents) {
                            await ir.unset_flags(entity, false)
                        }
                        ui.notifications.notify(game.i18n.format("IR.notification-flagsUnsetFolder", {folderName: folder.name}))
                    }
                },
            },
            render: api.listener
        }, {width: 500}).render(true)
    }

    // Thanks Freeze#2689 for the help on creating the file pickers.
    static listener(html) {
        html.find(".info-button").on("click", function(){
            new Dialog({
                title: game.i18n.localize("IR.dialogue-setupInfo"),
                content: game.i18n.localize("IR.dialogue-setupInfoContent"),
                buttons: {
                    one: {
                        label: `<i class="fas fa-check"></i> ${game.i18n.localize("IR.dialogue-okay")}`,
                    },
                },
                default: "one",
            }).render(true)
        });
        html.find(".picker-button-open").on("click", function(){
            new FilePicker({
                type: "audio",
                callback: function (path) {
                  html.find("input[name=folder-path-open]").val(path);
            }}).render(true);
        });
        html.find(".picker-button-open-folder").on("click", function(){
            new FilePicker({
                type: "folder",
                callback: function (path) {
                  html.find("input[name=folder-path-open]").val(path);
            }}).render(true);
        });
        html.find(".picker-button-close").on("click", function(){
            new FilePicker({
                type: "audio",
                callback: function (path) {
                  html.find("input[name=folder-path-close]").val(path);
            }}).render(true);
        });
        html.find(".picker-button-close-folder").on("click", function(){
            new FilePicker({
                type: "folder",
                callback: function (path) {
                  html.find("input[name=folder-path-close]").val(path);
            }}).render(true);
        });
    }
}