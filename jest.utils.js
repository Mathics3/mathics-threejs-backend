import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

export function testScreenshot(name, file) {
	test(name, async () => {
		const browser = await puppeteer.launch();

		try {
			const page = await browser.newPage();
			await page.goto(`http://localhost:8080/examples/test/${file}`);
			const image = await page.screenshot();

			expect(image).toMatchImageSnapshot({
				customSnapshotsDir: resolve(__dirname, "reference_images")
			});

			await browser.close();
		} catch (error) {
			await browser.close();

			throw error;
		}
	});
}
