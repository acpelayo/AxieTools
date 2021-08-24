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
            case 3:
                showTab(menu.children, menuTargets, index);
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
function showTab(menu, targets, toggleIndex) {
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
        // when a tab is open
        if (activeIndex == toggleIndex) {
            // when the current tab is clicked again
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].dataset.targetIndex == activeIndex) {
                    tabSlideOut(targets[i]);
                }
            }
        } else {
            // when another tab is clicked
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].dataset.targetIndex == activeIndex) {
                    tabSlideOut(targets[i]);
                }
                if (targets[i].dataset.targetIndex == toggleIndex) {
                    tabSlideIn(targets[i]);
                }
            }
        }
    } else {
        // when all tabs are closed
        for (let i = 0; i < targets.length; i++) {
            if (targets[i].dataset.targetIndex == toggleIndex) {
                tabSlideIn(targets[i]);
            }
        }
    }
}

function tabSlideIn(element) {
    const c = element.classList;
    c.remove('hidden', 'slide-out-top');
    c.add('slide-in-top');
    element.onanimationend = () => {
        element.onanimationend = undefined;
    };
}

function tabSlideOut(element) {
    const c = element.classList;
    c.remove('slide-in-top');
    c.add('slide-out-top');
    element.onanimationend = () => {
        c.add('hidden');
        element.onanimationend = undefined;
    };
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
    img.classList.remove('slide-in-preloader');
    img.classList.add('slide-out-preloader');
    preloader.classList.add('fade-out');
    preloader.onanimationend = () => preloader.classList.add('hidden');
}

window.onload = initDOM;
