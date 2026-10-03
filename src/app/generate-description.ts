import type { ProductState } from './product-state';

type GenerateDescriptionResponse = {
  description: string;
};

export async function generateDescription(
  state: ProductState,
): Promise<Pick<ProductState, 'description'>> {
  // Slide 4: ask the server to generate the description instead of building it in Angular.
  const response = await fetch('/api/generate-description', {
    body: JSON.stringify({
      productName: state.productName,
      specifications: state.specifications,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to generate description');
  }

  const result = (await response.json()) as GenerateDescriptionResponse;

  return {
    description: result.description,
  };
}
