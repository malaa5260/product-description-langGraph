"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const generate_description_1 = require("./generate-description");
const check_description_1 = require("./check-description");
const product_state_1 = require("./product-state");
const shorten_description_1 = require("./shorten-description");
exports.productGraph = new langgraph_1.StateGraph(product_state_1.ProductStateSchema)
    .addNode('generate', generate_description_1.generateDescription)
    .addNode('check', check_description_1.checkDescription)
    .addNode('shorten', shorten_description_1.shortenDescription)
    .addEdge(langgraph_1.START, 'generate')
    .addEdge('generate', 'check')
    .addConditionalEdges('check', (state) => {
    if (state.wordCount <= 100 || state.revisionCount >= 2) {
        return langgraph_1.END;
    }
    return 'shorten';
})
    .addEdge('shorten', 'check')
    .compile();
