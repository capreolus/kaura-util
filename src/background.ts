// Author: Kaura Peura

import * as browser from 'webextension-polyfill';
import * as util from './util';

(async () => {
    try {
        await createMenuItem({
            id: "download-twitter-content",
            title: 'Download Twitter content',
            contexts: ['page']
        });

        browser.runtime.onMessage.addListener(messageHandler);
        browser.menus.onClicked.addListener((info: any, tab: any) => {
            if (info.menuItemId !== 'download-twitter-content') return;
            browser.tabs.executeScript(tab.id, { file: '/twitter.js' });
        });

    } catch (err) {
        console.log(`Failed to start the extension: ${err.message}`);
    }
})();

function messageHandler(request: any) {
    if (request.title !== 'twitter:images') return;

    (async () => {
        const list = request.list;
        for (let { url, filename } of list) {

            try {
                await util.sleep(Math.floor(Math.random() * 1000));
                await browser.downloads.download({ url, filename, conflictAction: 'uniquify' });
            } catch (err) {
                console.log(`Error downloading file ${url}: ${err.message}`);
            }
        }
    })();
};

async function createMenuItem(options: object) {
    return new Promise((resolve, reject) => {
        browser.menus.create(options, () => {
            const err = browser.runtime.lastError;
            if (err != null) reject(err);
            resolve();
        });
    });
}
