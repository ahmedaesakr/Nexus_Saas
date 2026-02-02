import { test, expect } from '@playwright/test';

test('capture screenshots', async ({ page }) => {
  await page.goto('/library');
  await page.waitForTimeout(2000); // Wait for animations/renders
  await page.screenshot({ path: 'screenshots/library.png' });

  await page.goto('/detail');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/detail.png' });

  await page.goto('/detail-rejected');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/detail_rejected.png' });

  await page.goto('/analytics');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/analytics.png' });

  await page.goto('/users');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/users.png' });

  await page.goto('/settings');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/settings.png' });

  await page.goto('/settings/integrations');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/integrations.png' });

  // Test notifications
  await page.goto('/library');
  await page.click('button:has-text("notifications")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/notifications.png' });

  // Test upload modal
  await page.goto('/library');
  await page.click('button:has-text("Upload New Asset")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/upload.png' });
});
