"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDescription = checkDescription;
function checkDescription(state) {
    const text = state.description.trim();
    const wordCount = text === '' ? 0 : text.split(/\s+/u).length;
    return { wordCount };
}
