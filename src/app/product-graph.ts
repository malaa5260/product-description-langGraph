import { END, START, StateGraph } from '@langchain/langgraph';
import { generateDescription } from './generate-description';
import { checkDescription } from './check-description';
import { ProductStateSchema } from './product-state';
import { shortenDescription } from './shorten-description';

// export const productGraph = new StateGraph(ProductStateSchema)
//   .addNode('generate', generateDescription)
//   .addNode('check', checkDescription)
//   .addNode('shorten', shortenDescription)
//   .addEdge(START, 'generate')
//   .addEdge('generate', 'check')
//   .addConditionalEdges('check', (state) => {
//     if (state.wordCount <= 100 || state.revisionCount >= 2) {
//       return END;
//     }
//     return 'shorten';
//   })
//   .addEdge('shorten', 'check')
//   .compile();

export const productGraph = new StateGraph(ProductStateSchema)
  .addNode('generate', generateDescription)
  .addNode('check', checkDescription)
  .addNode('shorten', shortenDescription)
  .addEdge(START, 'generate')
  .addEdge('generate', 'check')
  .addConditionalEdges('check', (state) => {
    if (state.wordCount <= 100 || state.revisionCount >= 2) {
      return END;
    }
    return 'shorten';
  })
  .addEdge('shorten','check')
  .compile();
