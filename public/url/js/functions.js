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