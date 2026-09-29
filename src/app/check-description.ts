import type { ProductState } from './product-state';


export function checkDescription(state: ProductState): Pick<ProductState, 'wordCount'> {
  const text = state.description.trim();
  const wordCount = text === '' ? 0 : text.split(/\s+/u).length;
  return { wordCount };
}
