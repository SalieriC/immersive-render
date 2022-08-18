export function register_settings() {
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
        type: window.Azzu.SettingsTypes.FilePickerAudio,
        default: '',
        scope: 'world',
        config: true,
    });
}