import anim from './animations.js';

// menu functions
function showCard(toggleIndex) {
    const menu = document.querySelector('#menu').children;
    const targets = document.querySelectorAll('[data-target-index]');

    // check for current active tab
    let activeIndex = undefined;
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].classList.contains('active')) {
            activeIndex = menu[i].dataset.menuIndex;
            break;
        }
    }

    // toggle menu buttons
    for (let i = 0; i < menu.length; i++) {
        const btn = menu[i];
        if (btn.dataset.menuIndex == toggleIndex) {
            btn.classList.toggle('active');
        } else {
            btn.classList.remove('active');
        }
    }

    if (activeIndex) {
        // when a card is open
        if (activeIndex == toggleIndex) {
            // when the current card icon is clicked again
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].dataset.targetIndex == activeIndex) {
                    anim.cardSlideOut(targets[i]);
                }
            }
        } else {
            // when another card icon is clicked
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].dataset.targetIndex == activeIndex) {
                    anim.cardSlideOut(targets[i]);
                }
                if (targets[i].dataset.targetIndex == toggleIndex) {
                    anim.cardSlideIn(targets[i]);
                }
            }
        }
    } else {
        // when all cards are closed
        for (let i = 0; i < targets.length; i++) {
            if (targets[i].dataset.targetIndex == toggleIndex) {
                anim.cardSlideIn(targets[i]);
            }
        }
    }
}

// window functions
function newWindow() {
    window.open('index.html', '', 'width=300,height=600');
}

function hidePreloader() {
    const preloader = document.querySelector('#preloader');
    const img = preloader.children[0];

    img.classList.remove('slide-in-preloader');
    img.classList.add('slide-out-preloader');
    preloader.classList.add('fade-out');
    preloader.onanimationend = () => preloader.classList.add('hidden');
}

// slp functions
function updateSLPPrice(newPrice) {
    const slpPriceDisplay = document.querySelector('#slp-price');
    const slpTimeStamp = document.querySelector('#slp-timestamp');
    const date = new Date();

    slpPriceDisplay.dataset.slpPrice = newPrice;
    slpPriceDisplay.innerText = `1 SLP = ${newPrice} PHP`;
    slpTimeStamp.innerText = `via www.coingecko.com\n${date.toLocaleString()}`;
}

function updateSLPPHP() {
    const slpQuantity = document.querySelector('#slp-quantity').value;
    const managerShare = document.querySelector('#manager-share').value / 100;
    const scholarShare = document.querySelector('#scholar-share').value / 100;
    const slpPrice = document.querySelector('#slp-price').dataset.slpPrice;

    const managerSLP = document.querySelector('#manager-slp');
    const scholarSLP = document.querySelector('#scholar-slp');
    const slpphp = document.querySelector('#slp-php');

    slpphp.innerHTML = `Your <b>${slpQuantity} SLP</b> is worth around <b>${(slpQuantity * slpPrice).toFixed(2)} PHP</b>`;
    managerSLP.innerHTML = `Manager: <b>${(slpQuantity * managerShare * slpPrice).toFixed(2)} PHP</b>`;
    scholarSLP.innerHTML = `Scholar: <b>${(slpQuantity * scholarShare * slpPrice).toFixed(2)} PHP</b>`;
}

// energy functions
function updateEnergyDisplay(newVal) {
    const energy = document.querySelector('#energy');
    energy.innerText = newVal;
    energy.dataset.total = newVal;
}

function updateEnergyHistory(newVal, isNewRound = false) {
    const history = document.querySelector('#history > div');
    history.innerHTML += `<div class="history-text${isNewRound ? ' new-round' : ''}">${newVal >= 0 ? '+' + newVal : newVal}</div>`;
}

function resetEnergyHistory() {
    const history = document.querySelector('#history > div');
    history.innerHTML = `<div class="history-text">3</div>`;
}

function reset() {
    nextRound(true);
    updateEnergyDisplay(3);
    resetEnergyHistory();
}

function nextRound(isReset = false) {
    const roundNumDisplay = document.querySelector('#round-num');
    const currRound = isReset ? 1 : +roundNumDisplay.dataset.roundNum + 1;

    roundNumDisplay.dataset.roundNum = currRound;
    roundNumDisplay.innerText = `Round ${currRound}`;
}

export default {
    hidePreloader,
    newWindow,
    showCard,
    nextRound,
    reset,
    updateEnergyDisplay,
    updateEnergyHistory,
    updateSLPPrice,
    updateSLPPHP,
};
