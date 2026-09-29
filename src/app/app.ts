import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('product-description');
  protected readonly description = signal('');
  protected readonly wordCount = signal<number | null>(null);
  protected readonly isGenerating = signal(false);
  protected readonly error = signal('');

  protected async generate(): Promise<void> {
    if (this.isGenerating()) return;
    this.isGenerating.set(true);
    this.error.set('');
    try {
      const { productGraph } = await import('./product-graph');
      const { exampleProductState } = await import('./product-state');
      const result = await productGraph.invoke(exampleProductState);
      this.description.set(result.description);
      this.wordCount.set(result.wordCount);
    } catch {
      this.error.set('تعذّر تشغيل الجراف. جرّب تاني.');
    } finally {
      this.isGenerating.set(false);
    }
  }

}
