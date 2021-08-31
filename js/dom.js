import anim from './animations.js';
import utils from './utils.js';
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
    const scholarShare = document.querySelector('#scholar-share').value / 100;
    const managerShare = document.querySelector('#manager-share').value / 100;
    const slpPrice = document.querySelector('#slp-price').dataset.slpPrice;

    const slpphp = document.querySelector('#slp-php');
    const scholarSLP = document.querySelector('#scholar-slp');
    const managerSLP = document.querySelector('#manager-slp');

    slpphp.innerHTML = `Your <b>${slpQuantity} SLP</b> is worth around <b>${(slpQuantity * slpPrice).toFixed(2)} PHP</b>`;
    managerSLP.innerHTML = `Manager: <b>${(slpQuantity * managerShare * slpPrice).toFixed(2)} PHP</b>`;
    scholarSLP.innerHTML = `Scholar: <b>${(slpQuantity * scholarShare * slpPrice).toFixed(2)} PHP</b>`;
}

function setDOMSLPShare() {
    const slp = utils.getSLP();

    document.querySelector('#slp-quantity').value = slp.quantity;
    document.querySelector('#scholar-share').value = slp.scholar;
    document.querySelector('#manager-share').value = slp.manager;
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

// battle log functions
function createLogEntry(id, outcome, slp = 0) {
    const date = new Date(id);
    const newEntry = document.createElement('tr');
    newEntry.classList.add('entry');
    newEntry.dataset.time = id;

    const timestamp = document.createElement('td');
    const outcomeElem = document.createElement('td');
    const input = document.createElement('td');
    const icon = document.createElement('td');

    outcomeElem.classList.add(outcome);
    icon.classList.add('icon');

    timestamp.innerText = `${date.toLocaleDateString()}\n${date.toLocaleTimeString()}`;
    outcomeElem.innerText = outcome[0].toUpperCase() + outcome.slice(1);

    input.appendChild(document.createElement('input'));
    input.appendChild(document.createTextNode('SLP'));
    input.firstChild.type = 'number';
    input.firstChild.disabled = outcome == 'lose';
    input.firstChild.value = slp;
    input.firstChild.min = 0;
    input.firstChild.max = 30;

    icon.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
    icon.firstChild.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
    icon.firstChild.setAttribute('viewBox', '0 0 95.939 95.939');
    icon.firstChild.firstChild.setAttribute(
        'd',
        'M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0 c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608 c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021 c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535 c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97z'
    );

    newEntry.appendChild(timestamp);
    newEntry.appendChild(outcomeElem);
    newEntry.appendChild(input);
    newEntry.appendChild(icon);

    return newEntry;
}

function updateLogSummary(logs) {
    const summary = document.querySelector('#log-summary');
    const win = logs.reduce((total, l) => (l.outcome == 'win' ? total + 1 : total), 0);
    const draw = logs.reduce((total, l) => (l.outcome == 'draw' ? total + 1 : total), 0);
    const lose = logs.reduce((total, l) => (l.outcome == 'lose' ? total + 1 : total), 0);
    const slp = logs.reduce((total, l) => total + l.slp, 0);

    summary.children[1].innerText = `${slp} SLP`;
    summary.querySelector('.win').innerText = `${win}W`;
    summary.querySelector('.draw').innerText = `${draw}D`;
    summary.querySelector('.lose').innerText = `${lose}L`;
}

function generateLogList() {
    const logs = utils.getBattleLogs();
    const logList = document.querySelector('#log-list tbody');

    logs.forEach((l) => {
        const entry = createLogEntry(l.id, l.outcome, l.slp);
        logList.prepend(entry);
    });

    updateLogSummary(logs);
}

function setDOMDefaultSLP() {
    document.querySelector('#default-slp').value = utils.getDefaultSLP();
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
    setDOMSLPShare,
    createLogEntry,
    updateLogSummary,
    generateLogList,
    setDOMDefaultSLP,
};
