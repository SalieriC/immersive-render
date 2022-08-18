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
            configure_entity: api._configure_entity
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
        let { files } = await FilePicker.browse("data", pathToFolder);
        files = files.filter(i => i.endsWith(".ogg") || i.endsWith(".mp3") || i.endsWith(".flac") || i.endsWith(".webm") || i.endsWith(".wav"));
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

    static async _set_ir_flags(entity, openFolder, closeFolder, volume = -1) {
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
            ui.notifications.notify(game.i18n.format("IR.notification-flagsSet", {entityName: entity.name}))
            console.log(`Flags set on ${entity.name}.`, entity)
        }
        catch (err) {
            ui.notifications.notify(game.i18n.format("IR.error-flagsNotSet", {entityName: entity.name}))
            console.log(err)
        }
    }

    static async _unset_ir_flags(entity) {
        try {
            // I remove the flags completely instead of unsetting them to avoid data clutter:
            entity.update({ "flags.-=immersive-render": null })
            ui.notifications.notify(game.i18n.format("IR.notification-flagsUnset", {entityName: entity.name}))
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
                        await ir.set_flags(entity, OPEN_FOLDER, CLOSE_FOLDER, VOLUME)
                    }
                },
                two: {
                    label: `<i class="fas fa-trash"></i> ${game.i18n.localize("IR.dialogue-renderOptionsUnsetFlags")}`,
                    callback: async (_) => {
                        await ir.unset_flags(entity)
                    }
                },
            },
            default: "one",
            render: listener
        }).render(true);

        // Thanks Freeze#2689 for the help on creating the file pickers.
        function listener(html) {
            html.find(".picker-button-open").on("click", function(){
                new FilePicker({
                    type: "folder",
                    callback: function (path) {
                      html.find("input[name=folder-path-open]").val(path);
                }}).render(true);
            });
            html.find(".picker-button-close").on("click", function(){
                new FilePicker({
                    type: "folder",
                    callback: function (path) {
                      html.find("input[name=folder-path-close]").val(path);
                }}).render(true);
            });
        }
    }
}