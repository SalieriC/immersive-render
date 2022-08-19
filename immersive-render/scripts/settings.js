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
        name: "IR.defaultVolumeName",
        hint: "IR.defaultVolumeHint",
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
        name: game.i18n.localize("IR.chatMessageSfxName"),
        hint: game.i18n.localize("IR.chatMessageSfxHint"),
        scope: 'world',
        config: true,
        default: '',
        type: String,
        filePicker: 'audio',
    });
}