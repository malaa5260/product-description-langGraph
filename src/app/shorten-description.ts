import type { ProductState } from './product-state';

// Learning placeholder: keep the first 100 words, without calling an AI model.

export function shortenDescription(
  state: ProductState,
): Pick<ProductState, 'description' | 'revisionCount'> {
  return {
    description: state.description.trim().split(/\s+/u).slice(0, 100).join(' '),
    revisionCount: state.revisionCount + 1 ,
  };
}
