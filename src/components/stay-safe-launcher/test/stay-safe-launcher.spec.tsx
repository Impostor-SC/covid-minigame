import { newSpecPage } from '@stencil/core/testing';
import { StaySafeLauncher } from '../stay-safe-launcher';

describe('stay-safe-launcher', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StaySafeLauncher],
      html: `<stay-safe-launcher></stay-safe-launcher>`,
    });
    expect(page.root).toEqualHtml(`
      <stay-safe-launcher>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stay-safe-launcher>
    `);
  });
});
