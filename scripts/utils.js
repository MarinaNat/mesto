import { overlayActive, clickEsc, clickOverlay } from './index.js'

export function openPopup(overlay) {
    overlay.classList.add(overlayActive);
    document.addEventListener('keydown', clickEsc);
    overlay.addEventListener('click', clickOverlay);
}