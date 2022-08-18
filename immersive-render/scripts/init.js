import { api } from './api.js'
import { register_settings } from './settings.js'
import { register_context } from './contextual_options.js'

Hooks.on('setup', api.registerFunctions)

Hooks.on(`ready`, () => {
    // Ready stuff
    register_settings()
    console.log('Immersive Render (IR) | Ready')
})

Hooks.on("getActorDirectoryEntryContext", (html, entryOptions) => {
    register_context("actors", entryOptions)
});
Hooks.on("getItemDirectoryEntryContext", (html, entryOptions) => {
    register_context("items", entryOptions)
});
Hooks.on("getJournalDirectoryEntryContext", (html, entryOptions) => {
    register_context("journal", entryOptions)
});

// Hooks for playing SFX:
Hooks.on('renderJournalSheet', async (entitySheet, _, __) => {
    let entity = entitySheet.object
    let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
    if (currOpenPath) {
        ir.play_random_audio(currOpenPath, currVolume, false)
    }
})
Hooks.on('closeJournalSheet', async (entitySheet, _, __) => {
    let entity = entitySheet.object
    let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
    if (currClosePath) {
        ir.play_random_audio(currClosePath, currVolume, false)
    }
})

Hooks.on('renderCharacterSheet', async (entitySheet) => {
    let entity = entitySheet.object
    let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
    if (currOpenPath) {
        ir.play_random_audio(currOpenPath, currVolume, false)
    }
})
Hooks.on('closeCharacterSheet', async (entitySheet) => {
    let entity = entitySheet.object
    let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
    if (currClosePath) {
        ir.play_random_audio(currClosePath, currVolume, false)
    }
})

Hooks.on('renderItemSheet', async (entitySheet) => {
    let entity = entitySheet.object
    let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
    if (currOpenPath) {
        ir.play_random_audio(currOpenPath, currVolume, false)
    }
})
Hooks.on('closeItemSheet', async (entitySheet) => {
    let entity = entitySheet.object
    let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
    if (currClosePath) {
        ir.play_random_audio(currClosePath, currVolume, false)
    }
})

Hooks.on('createChatMessage', (entity) => {
    let chatMessageSfx = game.settings.get('immersive-render', 'chatMessageSfx')
    if (chatMessageSfx) {
        ir.play_audio(chatMessageSfx, -1, true)
    }
})