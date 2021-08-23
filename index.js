const energy = [3];

function initDOM() {
    const preloader = document.querySelector('#preloader');
    const buttons = document.querySelector('#btn');
    const energyDisplay = document.querySelector('#energy');
    const energyHistory = document.querySelector('#history');
    const menu = document.querySelector('#menu');
    const menuTargets = document.querySelectorAll('[data-target-index]');

    menu.addEventListener('click', (e) => {
        target = e.target;
        index = +target.dataset.menuIndex;

        switch (index) {
            case 1:
                newWindow();
                break;
            case 2:
                showTab(menu, menuTargets, index);
                break;
            default:
                break;
        }
    });

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

    hidePreloader(preloader);
}

// menu functions
function showTab(menu, targets, index) {
    for (let i = 0; i < targets.length; i++) {
        if (targets[i].dataset.targetIndex == index) {
            const isHidden = targets[i].classList.contains('hidden');
            const c = targets[i].classList;
            if (isHidden) {
                c.remove('hidden');
                c.remove('slide-out-left');
                c.add('slide-in-left');
                targets[i].onanimationstart = () => {
                    setActive(menu.children, index);
                };
            } else {
                c.remove('slide-in-left');
                c.add('slide-out-left');
                targets[i].onanimationend = () => {
                    c.add('hidden');
                    targets[i].onanimationend = undefined;
                };
            }
        } else targets[i].classList.remove('hidden');
    }
}

function setActive(menu, index) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].dataset.menuIndex == index) menu[i].classList.toggle('active');
        else menu[i].classList.remove('active');
    }
}

// energy functions
function updateEnergyDisplay(display, newVal) {
    display.innerText = newVal;
}

function appendEnergyHistory(history, newVal, isNewRound = false) {
    history.innerHTML += `<div class="history-text${isNewRound ? ' new-round' : ''}">${newVal >= 0 ? '+' + newVal : newVal}</div>`;
}

function resetEnergyHistory(history) {
    history.innerHTML = `<div class="history-text">3</div>`;
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

// window functions
function newWindow() {
    window.open('index.html', '', 'width=300,height=600');
}

function hideTabs(targets) {
    targets.forEach((target) => target.classList.add('hidden'));
}

function hidePreloader(preloader) {
    const img = preloader.children[0];
    img.classList.remove('slide-in-top');
    img.classList.add('slide-out-top');
    preloader.classList.add('fade-out');
    preloader.onanimationend = () => preloader.classList.add('hidden');
}

window.onload = initDOM;
