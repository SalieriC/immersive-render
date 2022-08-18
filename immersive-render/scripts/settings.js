export function register_settings() {
    // Default Volume
    game.settings.register('ir', 'defaultVolume', {
        name: game.i18n.localize("IR.defaultVolumeName"),
        hint: game.i18n.localize("IR.defaultVolumeHint"),
        type: Number,
        range: {
            min: 0,
            max: 1,
            step: 0.1
        },
        default: 1,
        scope: 'user',
        config: true,
    });
}