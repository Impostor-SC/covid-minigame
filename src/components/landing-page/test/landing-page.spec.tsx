import { newSpecPage } from '@stencil/core/testing';
import { LandingPage } from '../landing-page';

describe('landing-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LandingPage],
      html: `<landing-page></landing-page>`,
    });
    expect(page.root).toEqualHtml(`
      <landing-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </landing-page>
    `);
  });
});
