export function register_settings() {
    console.warn("Hello World!")
    // Default Volume
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
}