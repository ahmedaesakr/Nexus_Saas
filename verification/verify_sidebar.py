import asyncio
from playwright.async_api import async_playwright, expect

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 375, "height": 812}) # Mobile viewport
        page = await context.new_page()

        try:
            # Navigate to dashboard (login required, so might redirect)
            await page.goto("http://localhost:3000/dashboard")

            # Since we likely hit login, let's just check if the sidebar elements are present in the DOM
            # or if we are on the landing page/login.
            # However, the Sidebar component is used in dashboard layout.
            # Let's try to login first if needed.

            # Check if we are on login page
            if "login" in page.url or await page.get_by_text("Sign in").is_visible():
                print("Logging in...")
                await page.fill("input[type='email']", "alex@nexusflow.app")
                await page.fill("input[type='password']", "password123")
                await page.click("button[type='submit']")
                await page.wait_for_url("**/dashboard")
                print("Logged in successfully.")

            # Now we should be on dashboard.
            # Verify the mobile menu button has the correct aria attributes.
            menu_button = page.locator("button:has(.material-symbols-outlined:text('menu'))")

            # Wait for button to be visible
            await menu_button.wait_for(state="visible")

            # Check aria-label
            aria_label = await menu_button.get_attribute("aria-label")
            print(f"Menu Button Aria-Label: {aria_label}")
            if aria_label != "Open sidebar":
                print("FAIL: Menu button missing correct aria-label")

            # Check aria-expanded
            aria_expanded = await menu_button.get_attribute("aria-expanded")
            print(f"Menu Button Aria-Expanded: {aria_expanded}")

            # Check icon hidden
            icon = menu_button.locator(".material-symbols-outlined")
            aria_hidden = await icon.get_attribute("aria-hidden")
            print(f"Menu Icon Aria-Hidden: {aria_hidden}")
            if aria_hidden != "true":
                print("FAIL: Menu icon not hidden")

            # Click menu to open sidebar
            await menu_button.click()

            # Verify sidebar is open and close button exists
            close_button = page.locator("button[aria-label='Close sidebar']")
            await close_button.wait_for(state="visible")
            print("Sidebar opened, close button found.")

            # Take screenshot
            await page.screenshot(path="verification/sidebar_accessibility.png")
            print("Screenshot saved to verification/sidebar_accessibility.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path="verification/error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
