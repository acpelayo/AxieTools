import dom from './dom.js';
import handlers from './event-handlers.js';

function initDOM() {
    const energyBtn = document.querySelector('#energy-btn');
    const menu = document.querySelector('#menu');
    const slpBtn = document.querySelector('#refresh-slp');
    const slpQuantity = document.querySelector('#slp-quantity');
    const scholarShare = document.querySelector('#scholar-share');
    const logDefaultSLP = document.querySelector('#default-slp');
    const logBtn = document.querySelector('#log-btn');
    const logList = document.querySelector('#log-list tbody');
    const logClearBtn = document.querySelector('#log-summary svg');

    document.addEventListener('gesturestart', handlers.preventZoom);
    document.addEventListener('gesturechange', handlers.preventZoom);
    document.addEventListener('gestureend', handlers.preventZoom);
    slpBtn.addEventListener('click', handlers.getSLP);
    slpQuantity.addEventListener('input', handlers.slpQuantityInput);
    scholarShare.addEventListener('input', handlers.scholarShareInput);
    menu.addEventListener('click', handlers.menuClick);
    energyBtn.addEventListener('click', handlers.energyBtnClick);
    logDefaultSLP.addEventListener('input', handlers.logDefaultSLPInput);
    logBtn.addEventListener('click', handlers.logBtnClick);
    logList.addEventListener('click', handlers.logDelete);
    logList.addEventListener('input', handlers.logSLPInput);
    logClearBtn.addEventListener('click', handlers.logClear);

    dom.setDOMSLPShare();
    dom.generateLogList();
    dom.setDOMDefaultSLP();
    handlers.getSLP();

    if (window.matchMedia('(display-mode: standalone)').matches) {
        const width = 350;
        const height = window.screen.height - 150;
        window.resizeTo(width, height);
        window.moveTo(window.screen.width - width, 0);
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }

    dom.hidePreloader(preloader);
}

window.onload = initDOM;
