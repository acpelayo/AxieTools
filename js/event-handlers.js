import dom from './dom.js';
import utils from './utils.js';

function preventZoom(e) {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 1;
}

function updateWindowParams() {
    localStorage.setItem('width', window.outerWidth);
    localStorage.setItem('height', window.outerHeight);
    localStorage.setItem('screenX', window.screenX);
    localStorage.setItem('screenY', window.screenY);
}

// slp functions
async function getSLP() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=php');
        const resJson = await res.json();
        const slp = resJson['smooth-love-potion']['php'];
        dom.updateSLPPrice(slp);
        dom.updateSLPPHP();
    } catch (e) {
        console.log(e);
        return;
    }
}

function slpQuantityInput(e) {
    const t = e.target;
    t.value = utils.checkInputVal(t.max, t.min, t.value);

    dom.updateSLPPHP();
    utils.setSLP();
}

function scholarShareInput(e) {
    const t = e.target;
    t.value = utils.checkInputVal(t.max, t.min, t.value);

    const managerShare = 100 - t.value;
    document.querySelector('#manager-share').value = managerShare;
    dom.updateSLPPHP();
    utils.setSLP();
}

// menu clicks
function menuClick(e) {
    const index = +e.target.dataset.menuIndex;

    if (index == 1) dom.newWindow();
    else dom.showCard(index);
}

// energy button clicks
function energyBtnClick(e) {
    const t = e.target;

    if (t.id == 'endRound') {
        const [newSum, valAdded] = utils.addEnergy(2, true);

        dom.nextRound();
        dom.updateEnergyDisplay(newSum);
        dom.updateEnergyHistory(valAdded, true);
    } else if (t.id == 'reset') {
        dom.reset();
    } else if (t.dataset.val) {
        const [newSum, valAdded] = utils.addEnergy(+t.dataset.val);
        if (newSum >= 0) {
            dom.updateEnergyDisplay(newSum);
            dom.updateEnergyHistory(valAdded);
        }
    }
}

// battle logs win/lose/draw functions
function logBtnClick(e) {
    const t = e.target;
    const outcome = t.dataset.outcome;

    if (outcome) {
        const id = Date.now();
        const winSLP = +document.querySelector('#default-slp').value;
        const slp = outcome == 'win' ? winSLP : outcome == 'draw' ? Math.floor(winSLP / 2) : 0;

        const newEntryElem = dom.createLogEntry(id, outcome, slp);
        const newEntryObj = {
            id,
            outcome,
            slp,
        };

        utils.addBattleLog(newEntryObj);
        document.querySelector('#log-list tbody').prepend(newEntryElem);
    }
}

function logDelete(e) {
    const t = e.target;
    if (t.nodeName == 'svg') {
        const entry = t.parentNode.parentNode;
        const id = entry.dataset.time;

        utils.removeBattleLog(id);
        entry.parentNode.removeChild(entry);
    }
}

function logClear() {
    document.querySelector('#log-list tbody').innerHTML = '';
    utils.setBattleLogs([]);
    dom.updateLogSummary([]);
}

function logSLPInput(e) {
    const t = e.target;
    const entry = t.parentNode.parentNode;
    const id = +entry.dataset.time;

    t.value = utils.checkInputVal(t.max, t.min, t.value);

    const logs = utils.getBattleLogs();
    const entryObj = logs.find((l) => l.id == id);

    entryObj.slp = +t.value;
    utils.setBattleLogs(logs);
    dom.updateLogSummary(logs);
}

function logDefaultSLPInput(e) {
    const t = e.target;
    t.value = utils.checkInputVal(t.max, t.min, t.value);
    utils.setDefaultSLP(t.value);
}
export default {
    preventZoom,
    getSLP,
    slpQuantityInput,
    scholarShareInput,
    menuClick,
    energyBtnClick,
    logBtnClick,
    logDelete,
    logClear,
    logSLPInput,
    logDefaultSLPInput,
    updateWindowParams,
};
