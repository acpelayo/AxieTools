import dom from './dom.js';

function addEnergy(newEnergy, isNewRound = false) {
    const energy = document.querySelector('#energy');
    const oldSum = +energy.dataset.total;

    if (oldSum + newEnergy > 10 || oldSum + newEnergy < 0) {
        if (isNewRound) {
            newEnergy = 10 - oldSum;
        } else {
            return [-1, null];
        }
    }

    return [oldSum + newEnergy, newEnergy];
}

// localstorage
function setSLP() {
    const slp = {
        quantity: +document.querySelector('#slp-quantity').value,
        scholar: +document.querySelector('#scholar-share').value,
        manager: +document.querySelector('#manager-share').value,
    };
    localStorage.setItem('slp', JSON.stringify(slp));
}

function getSLP() {
    return (
        JSON.parse(localStorage.getItem('slp')) || {
            quantity: 0,
            scholar: 50,
            manager: 50,
        }
    );
}

function getBattleLogs() {
    return JSON.parse(localStorage.getItem('battleLogs')) || [];
}

function setBattleLogs(logs) {
    localStorage.setItem('battleLogs', JSON.stringify(logs));
}

function addBattleLog(log) {
    const logs = getBattleLogs();
    logs.push(log);
    dom.updateLogSummary(logs);
    setBattleLogs(logs);
}

function removeBattleLog(id) {
    let logs = getBattleLogs();
    logs = logs.filter((l) => l.id != id);
    dom.updateLogSummary(logs);
    setBattleLogs(logs);
}

function getDefaultSLP() {
    return JSON.parse(localStorage.getItem('defaultSLP')) || 6;
}

function setDefaultSLP(val) {
    localStorage.setItem('defaultSLP', JSON.stringify(val));
}

// check input val
function checkInputVal(max, min, val) {
    if (max != '' && +val > +max) return +max;
    else if (min != '' && +val < +min) return +min;
    else return +val;
}

export default {
    addEnergy,
    setSLP,
    getSLP,
    setBattleLogs,
    getBattleLogs,
    addBattleLog,
    removeBattleLog,
    checkInputVal,
    getDefaultSLP,
    setDefaultSLP,
};
