const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.handler = async (event) => {
    let browser = null;
    
    try {
        // Parse the incoming request
        const body = JSON.parse(event.body);
        const html = body.html;
        
        if (!html) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'HTML content is required' })
            };
        }
        
        // Launch browser with chromium
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
        
        const page = await browser.newPage();
        
        // Set viewport for consistent rendering
        await page.setViewport({
            width: 4800,
            height: 7364,
            deviceScaleFactor: 2
        });
        
        // Set HTML content
        await page.setContent(html, {
            waitUntil: ['networkidle0', 'domcontentloaded']
        });
        
        // Wait a bit for animations/fonts to load
        await new Promise(res => setTimeout(res, 10000));
        
        // Take screenshot
        const screenshot = await page.screenshot({
            type: 'png',
            fullPage: true
        });
        
        await browser.close();
        
        // Return binary image as base64
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'image/png',
            },
            body: screenshot.toString('base64'),
            isBase64Encoded: true
        };
        
    } catch (error) {
        console.error('Error:', error);
        
        if (browser) {
            await browser.close();
        }
        
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};