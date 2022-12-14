import { api } from './api.js'
import { register_settings } from './settings.js'
import { register_context,register_folder_context } from './contextual_options.js'
import { entity_hooks } from './entity_hooks.js'
import { set_vars_by_system } from './system_variables.js'
import { SUPPORTED_SYSTEMS } from "./system_variables.js"

Hooks.on('setup', api.registerFunctions)

Hooks.on(`ready`, () => {
    // Ready stuff
    let { renderJournalSheet, closeJournalSheet, renderActorSheet, closeActorSheet, renderItemSheet, closeItemSheet, createChatMessage } = set_vars_by_system()
    entity_hooks(renderJournalSheet, closeJournalSheet, renderActorSheet, closeActorSheet, renderItemSheet, closeItemSheet, createChatMessage)
    register_settings()
    console.log('Immersive Render (IR) | Ready')
    if (game.user?.isGM && game.settings.get('immersive-render', 'confirm00') === false) {
        // Initial Dialogue
        new Dialog({
            title: game.i18n.localize("IR.dialogue-welcome"),
            content: game.i18n.localize("IR.dialogue-welcomeContent")/*`<form>
                <h1>Welcome to Immersive Render (IR for short)</h1>
                <p>Immersive Render (IR for short) allows you (and any other GM) to configure audio or folder paths for each Actor, Item and Journal in your world. From a folder path, a random audio file is picked to play when the entities sheet is rendered (opened) and closed.</p>
                <p>Simply open the contextual menu (right click on Windows and Linux) of any Actor, Item, Journal or Folder of these (for batch editing) in the sidebar and select the IR option.</p>
                <p>Please note that currently you need to grant users permission to browse files for them to hear the audio file played*. Make sure to grant them this permission in Core Settings -> Permission Configurator.</p>
                <p>There is also a setting for IR that lets you configure a single audio file to be played when a new message is send in the chat.</p>
                <p><strong>Warning:</strong> You should only pick (folders with) very short audio files. Once they play, they play until they end. You've been warned.</p>
                <p>*Dev talk: I considered using sockets to circumvent this but that would only work if a GM is logged in and I didn't want this as a(nother) restriction. Maybe there is a good way around this. I am working on it but if you know one, feel free to open a Pull Request or Issue on the <a href="https://github.com/SalieriC/immersive-render">repository</a>. Thank you.</p>
                <hr />
                <div class="form-group">
                    <label for="readIt">Don't show this again: </label>
                    <input id="readIt" name="Read it!" type="checkbox"></input>
                </div>
                <hr />
                <p>This was a project I was thinking about for a long time. I love being immersed in a game and this - while it is something small - can make a real difference.</p>
                <p>Please also consider to donate if you like IR. This is one of the few ways of letting me know that IR is actually used and appreciated by some and helps me out a lot. Thank you so much. =)</p>
                <p><a href="https://ko-fi.com/salieric"><img style="border: 0px; display: block; margin-left: auto; margin-right: auto;" src="https://www.ko-fi.com/img/githubbutton_sm.svg" width="223" height="30" /></a></p>
            </form>`*/,
            buttons: {
                one: {
                    label: `<i class='fas fa-check'></i> ${game.i18n.localize("IR.dialogue-okay")}`,
                    callback: (html) => {
                        let readIt = html.find("#readIt")[0].checked
                        if (readIt === true) {
                            game.settings.set('immersive-render', 'confirm00', true)
                        }
                    }
                }
            },
        }).render(true);
    }
    if (game.user?.isGM && game.settings.get('immersive-render', 'confirm01') === false) {
        new Dialog({
            title: game.i18n.localize("IR.dialogue-system"),
            content: game.i18n.format("IR.dialogue-systemContent", {system: game.system.id, supportLevel: SUPPORTED_SYSTEMS.some(i => game.system.id === i) ? game.i18n.localize("IR.dialogue-systemSupported"): game.i18n.localize("IR.dialogue-systemNotSupported")}),
            buttons: {
                one: {
                    label: `<i class='fas fa-check'></i> ${game.i18n.localize("IR.dialogue-okay")}`,
                    callback: () => {
                        game.settings.set('immersive-render', 'confirm01', true)
                    }
                }
            },
        }).render(true);
    }
})

// Add IR contextual option to entities:
Hooks.on("getActorDirectoryEntryContext", (html, entryOptions) => {
    register_context("actors", entryOptions)
});
Hooks.on("getItemDirectoryEntryContext", (html, entryOptions) => {
    register_context("items", entryOptions)
});
Hooks.on("getJournalDirectoryEntryContext", (html, entryOptions) => {
    register_context("journal", entryOptions)
});

// Add option to folders for batch editing:
Hooks.on("getActorDirectoryFolderContext", (html, entryOptions) => {
    register_folder_context(entryOptions)
});
Hooks.on("getItemDirectoryFolderContext", (html, entryOptions) => {
    register_folder_context(entryOptions)
});
Hooks.on("getJournalDirectoryFolderContext", (html, entryOptions) => {
    register_folder_context(entryOptions)
});