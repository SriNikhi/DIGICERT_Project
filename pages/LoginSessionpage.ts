import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';

export async function loginWithSession(browser: Browser): Promise<{ page: Page; context: BrowserContext }> {
  const context = await browser.newContext();

  await context.addCookies([
    {
      name: 'sid',
      value: '00DWC000008XyqP!AQEAQBWsEB8vqMnUeNIJobiBt2bYJkJASj5MvA83MnzjBIm.' + 
             'ofiAMTGCggj82W7urgA2YYRxmZNOFzcxSZKIfy2vZWzJ5eOm',
      domain: 'digicert--rcadevpro.sandbox.my.salesforce.com',
      path: '/',
      httpOnly: true,
      secure: true
    }
  ]);

  const page = await context.newPage();
  await page.goto('https://digicert--rcadevpro.sandbox.lightning.force.com');
  return { page, context };
}
