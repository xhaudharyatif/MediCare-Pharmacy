// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// ==========================================
// WAIT FUNCTION
// ==========================================

export function wait(milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
    });
}

// ==========================================
// CREATE ELEMENT
// ==========================================

export function createElement(tag, text = '') {
    const element = document.createElement(tag);

    if (text !== '') {
        element.textContent = text;
    }

    return element;
}

// ==========================================
// CLEAR ELEMENT
// ==========================================

export function clearElement(element) {
    element.textContent = '';
}
