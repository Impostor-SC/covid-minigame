import { newE2EPage } from '@stencil/core/testing';

describe('stay-safe-game', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stay-safe-game></stay-safe-game>');

    const element = await page.find('stay-safe-game');
    expect(element).toHaveClass('hydrated');
  });
});
