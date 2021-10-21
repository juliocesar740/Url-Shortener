import Action from './action.js';
import * as functions from './functions.js';
import * as variables from './variables.js';

const action = new Action();

document.querySelector('.popup-original-url').style.bottom = '45%';

/**
 * 
 */
functions.checkWindowOuterWidth();

/**
 * 
 */
variables.input_url.addEventListener('input', (e) => action.inputUrlEvent(e));

/**
 * 
 */
document.body.addEventListener('mousedown', (e) => action.BodyMousedown(e));

/**
 * 
 */
window.addEventListener('scroll', () => action.WindowScroll());

/**
 * 
 */
window.addEventListener('wheel', (e) => action.WindowWheel(e));

/**
 * 
 */
window.addEventListener('resize', () => action.WindowResize());

/**
 * 
 */
variables.icon_selectAll.addEventListener('click', () => action.iconSelectAllClick());

/**
 * 
 */
variables.form_short_url.addEventListener('keyup', function (e) { e.preventDefault(); });

/**
 * 
 */
variables.textarea_description.addEventListener('keyup', function () {
   document.getElementById('characters-number').textContent = `${this.value.length} / 145`;
});

/**
 * 
 */
variables.btn_submit.addEventListener('click', (e) => action.btnSubmitClick(e));

/**
 * 
 */
variables.icon_generate_url.addEventListener('click', function () {
   document.getElementById('popup-input-url').value = functions.generateUrl();
}
);

/**
 * 
 */
functions.popupDescriptionEvents();