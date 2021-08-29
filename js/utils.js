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
function setStorageSLP() {
    const slp = {
        quantity: document.querySelector('#slp-quantity').value,
        scholar: document.querySelector('#scholar-share').value,
        manager: document.querySelector('#manager-share').value,
    };
    localStorage.setItem('slp', JSON.stringify(slp));
}

export default {
    addEnergy,
    setStorageSLP,
};
