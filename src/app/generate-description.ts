import type { ProductState } from './product-state';

// A deterministic learning example; no AI call yet.

export function generateDescription(state: ProductState): Pick<ProductState, 'description'> {
  return {
    description: `${state.productName}: ${state.specifications}.`,
  };
}
