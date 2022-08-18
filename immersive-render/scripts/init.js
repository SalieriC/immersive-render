import { api } from './api.js'
import { register_settings } from './settings.js'

Hooks.on('setup', api.registerFunctions)

Hooks.on(`ready`, () => {
    // Ready stuff
    register_settings()
    console.log('Immersive Render (IR) | Ready')
})