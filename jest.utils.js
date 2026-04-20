import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const browserLaunchOptions = {
	args: [
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--disable-background-timer-throttling',
		'--disable-backgrounding-occluded-windows',
		'--disable-renderer-backgrounding'
	]
};

export function testScreenshot(name, file) {
	test(name, async () => {
		const browser = await puppeteer.launch(browserLaunchOptions);

		try {
			const page = await browser.newPage();
			await page.goto(`http://localhost:8080/tests/${file}`);
			const image = await page.screenshot();

			expect(image).toMatchImageSnapshot({
				customSnapshotsDir: resolve(__dirname, 'reference_images')
			});

			await browser.close();
		} catch (error) {
			await browser.close();

			throw error;
		}
	}, 30000);
}
