import dom from './dom.js';
import utils from './utils.js';

function preventZoom(e) {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 1;
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
    if (t.value <= 0) t.value = 0;
    else t.value = +t.value;
    dom.updateSLPPHP();
}

function scholarShareInput(e) {
    const t = e.target;
    if (t.value > 100) t.value = 100;
    else if (t.value < 0) t.value = 0;
    else t.value = +t.value;

    document.querySelector('#manager-share').value = 100 - t.value;
    dom.updateSLPPHP();
}

// menu clicks
function menuClick(e) {
    const index = +e.target.dataset.menuIndex;

    switch (index) {
        case 1:
            dom.newWindow();
            break;
        case 2:
        case 3:
        case 4:
            dom.showCard(index);
            break;
        default:
            break;
    }
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

export default {
    preventZoom,
    getSLP,
    slpQuantityInput,
    scholarShareInput,
    menuClick,
    energyBtnClick,
};
