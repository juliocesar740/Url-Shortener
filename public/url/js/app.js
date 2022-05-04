import Action from "./action.js";
import * as functions from "./functions.js";
import * as variables from "./variables.js";

const action = new Action();

// Click handler
document.body.addEventListener("mousedown", function (e) {
  action.bodyMousedown(e);
});

// Check url
variables.input_url.addEventListener("input", function (e) {
  action.inputUrlEvent(e);
});

// Select command
variables.icon_selectAll.addEventListener("click", function(){action.iconSelectAllClick();})

variables.form_short_url.addEventListener("keyup", function (e) {
  e.preventDefault();
});

// Get the characters from the textarea
variables.textarea_description.addEventListener("keyup", function () {
  document.getElementById(
    "characters-number"
  ).textContent = `${this.value.length} / 145`;
});

// Handle submit button
variables.btn_submit.addEventListener("click", (e) => action.btnSubmitClick(e));

// Generate random url
variables.icon_generate_url.addEventListener("click", function () {
  document.getElementById("popup-input-url").value = functions.generateUrl();
});
