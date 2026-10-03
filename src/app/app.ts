import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('product-description');
  // Slide 3: user input state.
  protected readonly productName = signal('سماعة لاسلكية');
  protected readonly specifications = signal(
    'بطارية تدوم ثلاثين ساعة مع صوت واضح وتصميم مريح للاستخدام اليومي',
  );
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
      // Slide 3: build the graph state from the current form values.
      const result = await productGraph.invoke({
        productName: this.productName(),
        specifications: this.specifications(),
        description: '',
        revisionCount: 0,
        wordCount: 0,
      });
      this.description.set(result.description);
      this.wordCount.set(result.wordCount);
    } catch {
      this.error.set('تعذّر تشغيل الجراف. جرّب تاني.');
    } finally {
      this.isGenerating.set(false);
    }
  }

  // Slide 3: keep the product name signal synced with the input.
  protected updateProductName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.productName.set(input.value);
  }

  // Slide 3: keep the specifications signal synced with the textarea.
  protected updateSpecifications(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.specifications.set(textarea.value);
  }

}
