const energy = [3];
const devMode = false;

function initDOM() {
    const buttons = document.querySelector('#btn');
    const energyDisplay = document.querySelector('#energy');
    const energyHistory = document.querySelector('#history');

    buttons.addEventListener('click', (e) => {
        const target = e.target;

        if (target.id == 'endRound') {
            const newSum = appendEnergy(2, true);
            updateEnergyDisplay(energyDisplay, newSum);
            appendEnergyHistory(energyHistory, energy[energy.length - 1], true);
        } else if (target.id == 'reset') {
            reset(energyDisplay, energyHistory);
        } else if (target.dataset.val) {
            const newSum = appendEnergy(+target.dataset.val);
            if (newSum >= 0) {
                updateEnergyDisplay(energyDisplay, newSum);
                appendEnergyHistory(energyHistory, energy[energy.length - 1]);
            }
        }
    });
}

function reset(energyDisplay, energyHistory) {
    energy.length = 1;
    updateEnergyDisplay(energyDisplay, 3);
    resetEnergyHistory(energyHistory);
}

function appendEnergy(newEnergy, isNewRound = false) {
    const sum = energy.reduce((prev, curr) => prev + curr, 0);

    if (sum + newEnergy > 10 || sum + newEnergy < 0) {
        if (isNewRound) {
            newEnergy = 10 - sum;
        } else {
            return -1;
        }
    }

    energy.push(newEnergy);
    return sum + newEnergy;
}

function updateEnergyDisplay(display, newVal) {
    display.innerText = newVal;
}

function appendEnergyHistory(history, newVal, isNewRound = false) {
    history.innerHTML += `<div class="history-text${isNewRound ? ' new-round' : ''}">${newVal >= 0 ? '+' + newVal : newVal}</div>`;
}

function resetEnergyHistory(history) {
    history.innerHTML = `<div class="history-text new-round">3</div>`;
}

function newWindow() {
    window.open(devMode ? '/' : 'AxieTools', '', 'width=300,height=600');
}

window.onload = initDOM;
