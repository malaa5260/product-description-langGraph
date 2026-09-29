"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenDescription = shortenDescription;
// Learning placeholder: keep the first 100 words, without calling an AI model.
function shortenDescription(state) {
    return {
        description: state.description.trim().split(/\s+/u).slice(0, 100).join(' '),
        revisionCount: state.revisionCount + 1,
    };
}
