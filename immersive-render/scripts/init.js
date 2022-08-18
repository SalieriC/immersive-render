import { api } from './api.js';

Hooks.on('setup', api.registerFunctions)

Hooks.on(`ready`, () => {
    // Ready stuff
    console.log('Immersive Render (IR) | Ready');
})