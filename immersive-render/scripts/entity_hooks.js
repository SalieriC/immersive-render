export function entity_hooks(renderJournalSheet, closeJournalSheet, renderActorSheet, closeActorSheet, renderItemSheet, closeItemSheet, createChatMessage) {
    // Generic hooks which get their names from system_variables.js

    // Hooks for playing SFX:
    Hooks.on(renderJournalSheet, async (entitySheet, _, __) => {
        let entity = entitySheet.object
        let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
        if (currOpenPath) {
            ir.play_random_audio(currOpenPath, currVolume, false)
        }
    })
    Hooks.on(closeJournalSheet, async (entitySheet, _, __) => {
        let entity = entitySheet.object
        let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
        if (currClosePath) {
            ir.play_random_audio(currClosePath, currVolume, false)
        }
    })

    Hooks.on(renderActorSheet, async (entitySheet) => { // 5e: renderActorSheet5e; SWADE: renderCharacterSheet
        let entity = entitySheet.object
        let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
        if (currOpenPath) {
            ir.play_random_audio(currOpenPath, currVolume, false)
        }
    })
    Hooks.on(closeActorSheet, async (entitySheet) => {
        let entity = entitySheet.object
        let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
        if (currClosePath) {
            ir.play_random_audio(currClosePath, currVolume, false)
        }
    })

    Hooks.on(renderItemSheet, async (entitySheet) => {
        let entity = entitySheet.object
        let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
        if (currOpenPath) {
            ir.play_random_audio(currOpenPath, currVolume, false)
        }
    })
    Hooks.on(closeItemSheet, async (entitySheet) => {
        let entity = entitySheet.object
        let { currOpenPath, currClosePath, currVolume } = await ir.get_flags(entity)
        if (currClosePath) {
            ir.play_random_audio(currClosePath, currVolume, false)
        }
    })

    let timedOut = false
    Hooks.on(createChatMessage, async (message) => {
        let chatMessageSfx = game.settings.get('immersive-render', 'chatMessageSfx')
        if (Number(game.version) >= 10) {
            if (chatMessageSfx && timedOut === false && message.whisper.length <= 0 && game.userId != message.user.id) {
                ir.play_audio(chatMessageSfx, -1, false)
                timedOut = true
                await wait(game.settings.get('immersive-render', 'timeOut'))
                timedOut = false
            }
        } else {
            if (chatMessageSfx && timedOut === false && message.data.whisper.length <= 0 && game.userId != message.data.user) {
                ir.play_audio(chatMessageSfx, -1, false)
                timedOut = true
                await wait(game.settings.get('immersive-render', 'timeOut'))
                timedOut = false
            }
        }
    })
}

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}