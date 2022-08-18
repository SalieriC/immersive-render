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
            configure_entity: api._configure_entity
        }
    }

    static async _play_audio(audioPath, volume, playForAll = false) {
        if (!audioPath) {
            console.error(game.i18n.localize("IR.error-missingSoundFile"))
            return;
        }
        if (!volume) {
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
        let {files} = await FilePicker.browse("data", pathToFolder);
        files = files.filter(i => i.endsWith(".ogg") || i.endsWith(".mp3") || i.endsWith(".flac") || i.endsWith(".webm") || i.endsWith(".wav"));
        return files
    }

    static async _randomise_file(filePathsArray) {
        if (!filePathsArray) {
            console.error(game.i18n.localize("IR.error-missingFolderPath"))
            return;
        }
        const FILE = filePathsArray[Math.floor(Math.random()*filePathsArray.length)];
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

    static async _configure_entity(entity) {
        console.warn(entity)
    }
}