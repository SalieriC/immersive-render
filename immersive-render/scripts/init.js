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