const show_description = document.querySelectorAll('.show-description') ?? null;
const close_popup_description = document.getElementById('close-popup-description') ?? null;
const close_popup_original_url = document.getElementById('close-popup-original-url') ?? null;

// Depend on the outerwidth of the window the application will generate two different situations
export function checkWindowOuterWidth() {

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
            e.preventDefault();
         });
      });
   }
}

// events for popup-description element
export function popupDescriptionEvents() {
   
   if (show_description) {

      Array.from(show_description).forEach(popup_description => {

         popup_description.addEventListener('click', function () {
            document.querySelector('#popup-description').value = this.dataset.description;
            document.querySelector('.popup-description').classList.toggle('popup-description-activate');

         });
      })
   }

   if (close_popup_description) {

      close_popup_description.addEventListener('click', function () {

         document.querySelector('.popup-description').classList.toggle('popup-description-activate');

      });
   }
}

// Validate Url

export function checkUrl(url) {

   const pattern = "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})";

   if (!url.match(pattern)) {
      return false;
   }
   else {
      return true;
   }
}

// Create url

export function generateUrl() {

   const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
   return `localhost/url/${shuffleStr(charset).substr(0, 5)}`;

}

// Mix the url string

export function shuffleStr(str) {
   let random_string = '';

   for (let i = 0; i <= str.length; i++) {
      random_string += str.split('')[Math.floor(Math.random() * str.length)];
   }
   return random_string;
}