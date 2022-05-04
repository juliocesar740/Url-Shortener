import * as functions from "./functions.js";

const btn_shorten = document.getElementById("btn-shorten");
const btn_elements = document.querySelectorAll("#btn-shorten,.delete-action");
const popup_input_url = document.getElementById("popup-input-url");
let timeout;
export default class Action {
  constructor() {}

  // Event mousedown for body property
  bodyMousedown(e) {
    if (e.target === btn_shorten) {
      if (!functions.checkUrl(input_url.value)) {
        document.querySelector(".popup-warning p").textContent = "Invalid url!";

        document
          .querySelector(".popup-warning")
          .classList.add("popup-warning-activate");

        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          document
            .querySelector(".popup-warning")
            .classList.remove("popup-warning-activate");
        }, 4500);
      } else if (input_url.value.length > 145) {
        document.querySelector(".popup-warning p").textContent = "Long url!";

        document
          .querySelector(".popup-warning")
          .classList.add("popup-warning-activate");

        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          document
            .querySelector(".popup-warning")
            .classList.remove("popup-warning-activate");
        }, 4500);
      } else {
        Array.from(btn_elements).forEach((element_btn) => {
          element_btn.disabled = true;
        });

        document.getElementById("popup-input-url").value =
          functions.generateUrl();
        document.querySelector(".popup").style.opacity = "1";
        document.querySelector(".popup").style.zIndex = "1";
        document.querySelector(".popup").style.transform =
          "translate(-50%,-50%) scale(1.10,1.10)";
        document.querySelector("main").style.filter = "blur(3px)";
      }
    } else if (e.target.closest("main")) {
      Array.from(btn_elements).forEach((element) => {
        element.disabled = false;
      });

      document.querySelector(".popup").style.opacity = "0";
      document.querySelector(".popup").style.zIndex = "-2";
      document.querySelector(".popup").style.transform =
        "translate(-50%,-50%) scale(0.25,0.25)";
      document.querySelector("main").style.filter = "blur(0px)";
    }
  }

  // Event input for #input_url element
  inputUrlEvent(e) {
    if (e.target.value.length !== 0) {
      document.querySelector(".input-container").style.borderTop =
        "2px solid #06836e";
      document.querySelector(".input-container").style.borderRight =
        "2px solid #06836e";
      document.querySelector(".input-container").style.borderBottom =
        "2px solid #06836e";
      document.querySelector(".input-container").style.borderLeft =
        "2px solid #06836e";

      document.getElementById("paperclip").style.color = "#06836e";
      btn_shorten.style.opacity = "1";
    } else {
      document.querySelector(".input-container").style.borderTop =
        "2px solid #afafaf";
      document.querySelector(".input-container").style.borderRight =
        "2px solid #afafaf";
      document.querySelector(".input-container").style.borderBottom =
        "2px solid #afafaf";
      document.querySelector(".input-container").style.borderLeft =
        "2px solid #afafaf";

      document.getElementById("paperclip").style.color = "#afafaf";
      btn_shorten.style.opacity = "0";
    }
  }

  // Event click for btn_submit element
  btnSubmitClick(e) {
    const pattern_domain_name = /^(localhost\/)/g;
    const pattern_short_url = /(url)\/\w{5}/g;

    if (!popup_input_url.value.match(pattern_domain_name)) {
      e.preventDefault();

      document.getElementById("message").style.backgroundColor = "#F95E42";
      document.getElementById("message").style.color = "#7c1608";
      document.getElementById("message").textContent =
        "Invalid url - You can't edit domain name!";
    } else if (!popup_input_url.value.substr(10).match(pattern_short_url)) {
      e.preventDefault();

      document.getElementById("message").style.backgroundColor = "#F95E42";
      document.getElementById("message").style.color = "#7c1608";
      document.getElementById("message").textContent =
        "Required - You have to enter short url!";
    } else {
      document.querySelector("#description").value = document.querySelector(
        "#textarea-description"
      ).value;

      if (document.querySelector("#textarea-description").value.length === 0) {
        document.querySelector("#description").value = "Empty description";
      }

      document.getElementById("original_url").value = input_url.value;

      return true;
    }
  }

  // Event click for icon_selectAll element
  iconSelectAllClick() {
    popup_input_url.select();

    /* Copy the text inside the text field */
    document.execCommand("selectAll");
    document.execCommand("copy");
  }
}
