export function register_context(type, entryOptions) {
    entryOptions.push({
        name: "IR.contextual-renderOptions",
        icon: '<i class="fas fa-book-reader"></i>',
        callback: li => {
            const entity = game[type].get(li.data("documentId"));
            return ir.configure_entity(entity)
        },
        condition: li => {
            if (!game.user.isGM) return false;
            const entity = game[type].get(li.data("documentId"));
            return entity
        }
    });
}

export function register_folder_context(entryOptions) {
    entryOptions.push({
        name: "IR.contextual-renderOptions",
        icon: '<i class="fas fa-book-reader"></i>',
        callback: header => {
            const li = header.parent()[0];
            const folder = game.folders.get(li.dataset.folderId)
            return ir.configure_folder(folder)
        },
        condition: header => {
            return game.user?.isGM && header.parent().find('.document').length > 0
        }
    });
}