import { newE2EPage } from '@stencil/core/testing';

describe('landing-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<landing-page></landing-page>');

    const element = await page.find('landing-page');
    expect(element).toHaveClass('hydrated');
  });
});
