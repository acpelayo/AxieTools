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

export default {
    addEnergy,
};
