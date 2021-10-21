import * as functions from './functions.js';

const btn_shorten = document.getElementById('btn-shorten');
const popup_input_url = document.getElementById('popup-input-url');
const btn_elements = document.querySelectorAll('#btn-shorten,.delete-action');
const close_popup_original_url = document.getElementById('close-popup-original-url') ?? null;
let count_bottom = 45;
let count_scroller = 0;
let timeout;

/**
 * 
 */

export default class Action {

   constructor() { }

   // Event input  for #input_url element
   inputUrlEvent(e) {

      if (e.target.value.length !== 0) {
         document.querySelector('.input-container').style.borderTop = '2px solid #06836e';
         document.querySelector('.input-container').style.borderRight = '2px solid #06836e';
         document.querySelector('.input-container').style.borderBottom = '2px solid #06836e';
         document.querySelector('.input-container').style.borderLeft = '2px solid #06836e';

         document.getElementById('paperclip').style.color = '#06836e';
         btn_shorten.style.opacity = '1';
      }
      else {
         document.querySelector('.input-container').style.borderTop = '2px solid #afafaf';
         document.querySelector('.input-container').style.borderRight = '2px solid #afafaf';
         document.querySelector('.input-container').style.borderBottom = '2px solid #afafaf';
         document.querySelector('.input-container').style.borderLeft = '2px solid #afafaf';

         document.getElementById('paperclip').style.color = '#afafaf';
         btn_shorten.style.opacity = '0';
      }
   }

   // Event mousedown for body property
   BodyMousedown(e) {

      if (e.target === btn_shorten) {

         if (!functions.checkUrl(input_url.value)) {

            document.querySelector('.popup-warning p').textContent = 'Invalid url!';

            document.querySelector('.popup-warning').classList.add('popup-warning-activate');

            if (timeout) { clearTimeout(timeout); }

            timeout = setTimeout(() => {
               document.querySelector('.popup-warning').classList.remove('popup-warning-activate');
            }, 4500);

         }
         else if (input_url.value.length > 145) {

            document.querySelector('.popup-warning p').textContent = 'Long url!';

            document.querySelector('.popup-warning').classList.add('popup-warning-activate');

            if (timeout) { clearTimeout(timeout); }

            timeout = setTimeout(() => {
               document.querySelector('.popup-warning').classList.remove('popup-warning-activate');
            }, 4500);
         }
         else {

            Array.from(btn_elements).forEach((element_btn) => {
               element_btn.disabled = true;
            });

            document.getElementById('popup-input-url').value = functions.generateUrl();
            document.querySelector('.popup').style.opacity = '1';
            document.querySelector('.popup').style.zIndex = '1';
            document.querySelector('.popup').style.transform = 'scale(1.10,1.10)';
            document.querySelector('main').style.filter = 'blur(3px)';
         }
      }
      else if (e.target.closest('main')) {

         Array.from(btn_elements).forEach((element) => {
            element.disabled = false;
         });

         document.querySelector('.popup').style.opacity = '0';
         document.querySelector('.popup').style.zIndex = '-1';
         document.querySelector('.popup').style.transform = 'scale(0.25,0.25)';
         document.querySelector('main').style.filter = 'blur(0px)';
      }
   }

   // Event scroll for window object
   WindowScroll() {
      if (window.scrollY > count_scroller) {

         count_scroller = window.scrollY;
         count_bottom -= 1;

         if (count_bottom <= -255) {
            count_bottom = -225;
         }
         else {
            document.querySelector('.popup-original-url').style.bottom = `${count_bottom}%`;
            document.querySelector('.popup-description').style.bottom = `${count_bottom}%`;
         }
      }
      else if (window.scrollY < count_scroller) {

         count_scroller = window.scrollY;

         count_bottom += 1;

         if (count_bottom >= 45) {
            count_bottom = 45;
         }
         else {
            document.querySelector('.popup-original-url').style.bottom = `${count_bottom}%`;
            document.querySelector('.popup-description').style.bottom = `${count_bottom}%`;
         }
      }
   }

   // Event wheel for window object
   WindowWheel(e) {

      if (window.outerWidth <= 1191) {
         if (e.deltaY > 0) {

            count_bottom -= 15;

            if (count_bottom <= -255) {
               count_bottom = -225;
            }
            else {
               document.querySelector('.popup-original-url').style.bottom = `${count_bottom}%`;
               document.querySelector('.popup-description').style.bottom = `${count_bottom}%`;
            }

         }
         else if (e.deltaY < 0) {

            count_bottom += 15;

            if (count_bottom >= 45) {
               count_bottom = 45;
            }
            else {
               document.querySelector('.popup-original-url').style.bottom = `${count_bottom}%`;
               document.querySelector('.popup-description').style.bottom = `${count_bottom}%`;
            }
         }
      }
      else if (window.outerWidth > 1191) {
         if (e.deltaY > 0) {

            count_bottom -= 5;

            if (count_bottom <= 5) {
               count_bottom = 5;
            }
            else {
               document.querySelector('.popup-original-url').style.bottom = `${count_bottom}%`;
               document.querySelector('.popup-description').style.bottom = `${count_bottom}%`;
            }

         }
         else if (e.deltaY < 0) {

            count_bottom += 15;

            if (count_bottom >= 45) {
               count_bottom = 45;
            }
            else {
               document.querySelector('.popup-original-url').style.bottom = `${count_bottom}%`;
               document.querySelector('.popup-description').style.bottom = `${count_bottom}%`;
            }
         }
      }
   }

   // Event resize for window object
   WindowResize() {

      console.log('a')

      if (window.outerWidth <= 1191) {

         Array.from(document.querySelectorAll('.show-original-url')).forEach(element => {

            element.textContent = 'See original url';

            element.addEventListener('click', function () {
               document.querySelector('#show-popup-original-url').textContent = this.dataset.original_url;
               document.querySelector('.popup-original-url').classList.toggle('popup-original-url-activate');
            });
         });

         if (close_popup_original_url) {
            close_popup_original_url.addEventListener('click', function () {
               document.querySelector('.popup-original-url').classList.toggle('popup-original-url-activate');
            });
         }

      }
      else if (window.outerWidth > 1191) {
         Array.from(document.querySelectorAll('.show-original-url')).forEach(element => {

            element.textContent = element.dataset.original_url;

            element.addEventListener('click', function (e) {
               console.log(this);
               e.preventDefault();
            });
         });
      }
   }

   // Event click for icon_selectAll element
   iconSelectAllClick() {

      popup_input_url.select();

      /* Copy the text inside the text field */
      document.execCommand("selectAll");
      document.execCommand("copy");
   }

   // Event click for btn_submit element 
   btnSubmitClick(e) {

      const pattern_domain_name = /^(localhost\/)/g;
      const pattern_short_url = /(url)\/\w{5}/g;

      if (!popup_input_url.value.match(pattern_domain_name)) {

         e.preventDefault();

         document.getElementById('message').style.backgroundColor = '#F95E42';
         document.getElementById('message').style.color = '#7c1608';
         document.getElementById('message').textContent = "Invalid url - You can't edit domain name!";

      }
      else if (!popup_input_url.value.substr(10).match(pattern_short_url)) {

         e.preventDefault();

         document.getElementById('message').style.backgroundColor = '#F95E42';
         document.getElementById('message').style.color = '#7c1608';
         document.getElementById('message').textContent = "Required - You have to enter short url!";

      }
      else {

         document.querySelector('#description').value = document.querySelector('#textarea-description').value;

         if (document.querySelector('#textarea-description').value.length === 0) {
            document.querySelector('#description').value = 'Empty description';
         }

         document.getElementById('original_url').value = input_url.value;

         return true;
      }
   }

}
