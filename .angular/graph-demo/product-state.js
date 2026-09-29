"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleProductState = exports.ProductStateSchema = void 0;
const langgraph_1 = require("@langchain/langgraph");
const zod_1 = require("zod");
exports.ProductStateSchema = new langgraph_1.StateSchema({
    productName: zod_1.z.string(),
    specifications: zod_1.z.string(),
    description: zod_1.z.string(),
    revisionCount: zod_1.z.number(),
    wordCount: zod_1.z.number(),
});
exports.exampleProductState = {
    productName: 'سماعة لاسلكية',
    // Deliberately long fixture so the learning example visits the shorten node.
    specifications: Array(15)
        .fill('بطارية تدوم ثلاثين ساعة مع صوت واضح وتصميم مريح للاستخدام اليومي')
        .join(' '),
    description: '',
    revisionCount: 0,
    wordCount: 0,
};
