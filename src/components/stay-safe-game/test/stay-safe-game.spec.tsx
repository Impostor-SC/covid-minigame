import { newSpecPage } from '@stencil/core/testing';
import { StaySafeGame } from '../stay-safe-game';

describe('stay-safe-game', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StaySafeGame],
      html: `<stay-safe-game></stay-safe-game>`,
    });
    expect(page.root).toEqualHtml(`
      <stay-safe-game>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stay-safe-game>
    `);
  });
});
