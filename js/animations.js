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

export default {
    cardSlideIn,
    cardSlideOut,
};
