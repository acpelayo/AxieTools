const energy = [3];
let slpPrice;
let roundNum = 1;

function initDOM() {
    const preloader = document.querySelector('#preloader');
    const buttons = document.querySelector('#btn');
    const energyDisplay = document.querySelector('#energy');
    const energyHistory = document.querySelector('#history > div');
    const menu = document.querySelector('#menu');
    const menuTargets = document.querySelectorAll('[data-target-index]');
    const slpBtn = document.querySelector('#refresh-slp');
    const slpQuantity = document.querySelector('#slp-quantity');
    const scholarShare = document.querySelector('#scholar-share');
    const managerShare = document.querySelector('#manager-share');

    // prevent zoom on touch devices
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
        // special hack to prevent zoom-to-tabs gesture in safari
        document.body.style.zoom = 1;
    });

    document.addEventListener('gesturechange', function (e) {
        e.preventDefault();
        // special hack to prevent zoom-to-tabs gesture in safari
        document.body.style.zoom = 1;
    });

    document.addEventListener('gestureend', function (e) {
        e.preventDefault();
        // special hack to prevent zoom-to-tabs gesture in safari
        document.body.style.zoom = 1;
    });

    // fetch slp api
    slpBtn.addEventListener('click', getSLP);
    getSLP();

    // events for slp calculator
    slpQuantity.addEventListener('input', (e) => {
        const t = e.target;
        if (t.value <= 0) t.value = 0;
        else t.value = +t.value;
        updateSLPPHP();
    });

    scholarShare.addEventListener('input', (e) => {
        const t = e.target;
        if (t.value > 100) t.value = 100;
        else if (t.value < 0) t.value = 0;
        else t.value = +t.value;

        managerShare.value = 100 - t.value;
        updateSLPPHP();
    });

    // menu events
    menu.addEventListener('click', (e) => {
        const index = +e.target.dataset.menuIndex;

        switch (index) {
            case 1:
                newWindow();
                break;
            case 2:
            case 3:
            case 4:
                showCard(menu.children, menuTargets, index);
                break;
            default:
                break;
        }
    });

    // energy button events
    buttons.addEventListener('click', (e) => {
        const t = e.target;

        if (t.id == 'endRound') {
            const newSum = appendEnergy(2, true);
            nextRound();
            updateEnergyDisplay(energyDisplay, newSum);
            appendEnergyHistory(energyHistory, energy[energy.length - 1], true);
        } else if (t.id == 'reset') {
            reset(energyDisplay, energyHistory);
        } else if (t.dataset.val) {
            const newSum = appendEnergy(+t.dataset.val);
            if (newSum >= 0) {
                updateEnergyDisplay(energyDisplay, newSum);
                appendEnergyHistory(energyHistory, energy[energy.length - 1]);
            }
        }
    });

    // preloader
    hidePreloader(preloader);
}

// menu functions
function showCard(menu, targets, toggleIndex) {
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
                    cardSlideOut(targets[i]);
                }
            }
        } else {
            // when another card icon is clicked
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].dataset.targetIndex == activeIndex) {
                    cardSlideOut(targets[i]);
                }
                if (targets[i].dataset.targetIndex == toggleIndex) {
                    cardSlideIn(targets[i]);
                }
            }
        }
    } else {
        // when all cards are closed
        for (let i = 0; i < targets.length; i++) {
            if (targets[i].dataset.targetIndex == toggleIndex) {
                cardSlideIn(targets[i]);
            }
        }
    }
}

function cardSlideIn(element) {
    const c = element.classList;
    c.remove('hidden', 'slide-out-top');
    c.add('slide-in-top');
    element.onanimationend = () => {
        element.onanimationend = undefined;
    };
}

function cardSlideOut(element) {
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

// slp functions
async function getSLP() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=php');
        const resJson = await res.json();
        const slp = resJson['smooth-love-potion']['php'];
        updateSLPPrice(slp);
        updateSLPPHP();
    } catch (e) {
        console.log(e);
        return;
    }
}

function updateSLPPrice(newPrice) {
    const slpPriceDisplay = document.querySelector('#slp-price');
    const slpTimeStamp = document.querySelector('#slp-timestamp');
    const date = new Date();
    slpPriceDisplay.innerText = `1 SLP = ${newPrice} PHP`;
    slpTimeStamp.innerText = `via www.coingecko.com\n${date.toLocaleString()}`;
    slpPrice = newPrice;
}

function updateSLPPHP() {
    const slpQuantity = document.querySelector('#slp-quantity').value;
    const managerShare = document.querySelector('#manager-share').value / 100;
    const scholarShare = document.querySelector('#scholar-share').value / 100;

    const managerSLP = document.querySelector('#manager-slp');
    const scholarSLP = document.querySelector('#scholar-slp');
    const slpphp = document.querySelector('#slp-php');

    slpphp.innerHTML = `Your <b>${slpQuantity} SLP</b> is worth around <b>${(slpQuantity * slpPrice).toFixed(2)} PHP</b>`;
    managerSLP.innerHTML = `Manager: <b>${(slpQuantity * managerShare * slpPrice).toFixed(2)} PHP</b>`;
    scholarSLP.innerHTML = `Scholar: <b>${(slpQuantity * scholarShare * slpPrice).toFixed(2)} PHP</b>`;
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
    roundNum = 0;
    nextRound();
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

function nextRound() {
    document.querySelector('#round-num').innerText = `Round ${(roundNum += 1)}`;
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
