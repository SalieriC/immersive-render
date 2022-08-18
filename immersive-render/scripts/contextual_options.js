export function register_context(type, entryOptions) {
    entryOptions.push({
        name: "IR.contextual-renderOptions",
        icon: '<i class="fas fa-book-reader"></i>',
        callback: li => {
            const entity = game[type].get(li.data("documentId"));
            return ir.configureEntity(entity)
        },
        condition: li => {
            if (!game.user.isGM) return false;
            const entity = game[type].get(li.data("documentId"));
            return entity;
        }
    });
}