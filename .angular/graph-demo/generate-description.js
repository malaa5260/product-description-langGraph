"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDescription = generateDescription;
// A deterministic learning example; no AI call yet.
function generateDescription(state) {
    return {
        description: `${state.productName}: ${state.specifications}.`,
    };
}
