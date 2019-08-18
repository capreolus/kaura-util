// Author: Kaura Peura

import * as browser from 'webextension-polyfill';

(() => {
    const name = userName();
    if (name == null) return;

    const articles = document.getElementsByTagName('article');
    if (articles.length < 1) return;

    const tweetArticle = articles[0];
    const images = document.getElementsByTagName('img');
    const imageElements = [];

    for (let i = 0; i < images.length; i++) {
        imageElements.push(images[i]);
    }

    const list = imageElements
        .filter(img => tweetArticle.contains(img))
        .map(img => imageData(img, name))
        .filter(obj => obj != null);

    browser.runtime.sendMessage({ title: 'twitter:images', list });

    function imageData(img: HTMLImageElement, name: string) {
        const src = img.src;
        const res = /https:\/\/pbs.twimg.com\/media\/([_\-A-Za-z0-9]+)\?/.exec(src);
        if (!Array.isArray(res) || res.length !== 2) return null;

        return {
            url: `${src.slice(0, src.indexOf('?'))}?format=png`,
            filename: `${name}_${res[1]}.png`
        };
    };

    function userName() {
        const res = /https:\/\/twitter.com\/([^\/]+)\//.exec(window.location.href);
        if (!Array.isArray(res) || res.length !== 2) return null;
        return res[1];
    }
})();
