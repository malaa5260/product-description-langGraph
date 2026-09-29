import { StateSchema } from '@langchain/langgraph';
import { z } from 'zod';

export const ProductStateSchema = new StateSchema({
  productName: z.string(),
  specifications: z.string(),
  description: z.string(),
  revisionCount: z.number(),
  wordCount: z.number(),
});

export type ProductState = typeof ProductStateSchema.State;

export const exampleProductState: ProductState = {
  productName: 'سماعة لاسلكية',
  // Deliberately long fixture so the learning example visits the shorten node.
  specifications: Array(15)
    .fill('بطارية تدوم ثلاثين ساعة مع صوت واضح وتصميم مريح للاستخدام اليومي')
    .join(' '),
  description: '',
  revisionCount: 0,
  wordCount: 0,
};
