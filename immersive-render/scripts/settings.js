export function register_settings() {
    // Intro Read
    game.settings.register('immersive-render', 'confirm00', {
        name: "Intro was read.",
        hint: "This confirms the GM has read the intro.",
        type: Boolean,
        default: false,
        scope: 'client',
        config: false,
    });
    // Default Volume.
    game.settings.register('immersive-render', 'defaultVolume', {
        name: "IR.setting-defaultVolumeName",
        hint: "IR.setting-defaultVolumeHint",
        type: Number,
        range: {
            min: 0,
            max: 10,
            step: 0.1
        },
        default: 1,
        scope: 'world',
        config: true
    });
    // SFX played when a new chat message is created.
    game.settings.register('immersive-render', 'chatMessageSfx', {
        name: game.i18n.localize("IR.setting-chatMessageSfxName"),
        hint: game.i18n.localize("IR.setting-chatMessageSfxHint"),
        scope: 'world',
        config: true,
        default: 'sounds/notify.wav',
        type: String,
        filePicker: 'audio',
    });
    // Timeout for chat message notification
    game.settings.register('immersive-render', 'timeOut', {
        name: game.i18n.localize("IR.setting-timeOutName"),
        hint: game.i18n.localize("IR.setting-timeOutHint"),
        scope: 'world',
        config: true,
        default: 2000,
        type: Number,
    });
}