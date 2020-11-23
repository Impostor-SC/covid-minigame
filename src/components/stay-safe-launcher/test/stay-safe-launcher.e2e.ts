import { newE2EPage } from '@stencil/core/testing';

describe('stay-safe-launcher', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stay-safe-launcher></stay-safe-launcher>');

    const element = await page.find('stay-safe-launcher');
    expect(element).toHaveClass('hydrated');
  });
});
