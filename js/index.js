import dom from './dom.js';
import handlers from './event-handlers.js';

function initDOM() {
    const buttons = document.querySelector('#btn');
    const menu = document.querySelector('#menu');
    const slpBtn = document.querySelector('#refresh-slp');
    const slpQuantity = document.querySelector('#slp-quantity');
    const scholarShare = document.querySelector('#scholar-share');

    document.addEventListener('gesturestart', handlers.preventZoom);
    document.addEventListener('gesturechange', handlers.preventZoom);
    document.addEventListener('gestureend', handlers.preventZoom);
    slpBtn.addEventListener('click', handlers.getSLP);
    slpQuantity.addEventListener('input', handlers.slpQuantityInput);
    scholarShare.addEventListener('input', handlers.scholarShareInput);
    menu.addEventListener('click', handlers.menuClick);
    buttons.addEventListener('click', handlers.energyBtnClick);

    handlers.getSLP();
    dom.hidePreloader(preloader);
}

window.onload = initDOM;
