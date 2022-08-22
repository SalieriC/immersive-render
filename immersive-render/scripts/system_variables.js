export function set_vars_by_system() {
    let renderJournalSheet
    let closeJournalSheet
    let renderActorSheet
    let closeActorSheet
    let renderItemSheet
    let closeItemSheet
    let createChatMessage
    switch (game.system.id) {
        case "swade":
            renderJournalSheet = "renderJournalSheet"
            closeJournalSheet = "closeJournalSheet"
            renderActorSheet = "renderCharacterSheet"
            closeActorSheet = "closeCharacterSheet"
            renderItemSheet = "renderItemSheet"
            closeItemSheet = "closeItemSheet"
            createChatMessage = "createChatMessage"
            break;
        case "dnd5e":
            renderJournalSheet = "renderJournalSheet"
            closeJournalSheet = "closeJournalSheet"
            renderActorSheet = "renderActorSheet5e"
            closeActorSheet = "closeActorSheet5e"
            renderItemSheet = "renderItemSheet"
            closeItemSheet = "closeItemSheet"
            createChatMessage = "createChatMessage"
            break;
        default:
            // These should work for the Simple Worldbuilding system and possibly others.
            renderJournalSheet = "renderJournalSheet"
            closeJournalSheet = "closeJournalSheet"
            renderActorSheet = "renderActorSheet"
            closeActorSheet = "closeActorSheet"
            renderItemSheet = "renderItemSheet"
            closeItemSheet = "closeItemSheet"
            createChatMessage = "createChatMessage"
    }
    return { renderJournalSheet, closeJournalSheet, renderActorSheet, closeActorSheet, renderItemSheet, closeItemSheet, createChatMessage }
}