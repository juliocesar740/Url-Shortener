<?php

use app\database\Database;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once './functions.php';
require_once '../constants.php';

// load environment variables
$dotenv = Dotenv\Dotenv::createImmutable($ROOT_PATH);
$dotenv->load();

$database = new Database([
   'db_dsn' => $_ENV['DB_DSN'],
   'db_user' => $_ENV['DB_USER'],
   'db_password' => $_ENV['DB_PASSWORD']
]);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

   $getResults = handleGet($database);

   $select = $getResults['select']; // get all the data from the database's table short links
   $rows = $getResults['rows'];  // get all the rows from the database's table short links
   
}
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
   handlePost($database);
}

?>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Url Shortener</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
   <link rel="stylesheet" href="../css/style.css">
</head>

<body>
   <main>
      <div class="url-shortener-container">
         <h2>Url Shortener</h2>
         <div class="input-container">
            <i class="fas fa-paperclip" id="paperclip"></i>
            <input type="text" id="input_url" autocomplete="off" placeholder="Enter or paste a long url...">
            <button id="btn-shorten">Shorten</button>
         </div>
         <?php if ($rows > 0) : ?>
            <div class="container-flex">
               <p id="links_clicks">Total links: <b id="links"><?php echo $rows ?></b> & Total clicks: <b id="clicks"><?php echo $database->sumAllClicks()['sum_clicks'] ?></b></p>
               <form id="form-clear" action="" method="post">
                  <input type="hidden" name="delete-all-rows" value="">
                  <button id="btn-clear-all-rows" type="submit">Clear All</button>
               </form>
            </div>
            <table class="table">
               <tr>
                  <th scope="col">Shorten Url</th>
                  <th scope="col">Original Url</th>
                  <th scope="col">Clicks</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
               </tr>
               <?php if ($select) : ?>
                  <?php foreach ($select as $key => $value) : ?>
                     <tr class="row">
                        <td><a href=<?php echo 'http://localhost/url/' . substr($value['shorten_url'], 14) ?> target="_blank" data-source=<?php echo 'http://localhost/url/' . substr($value['shorten_url'], 14) ?>><?php echo $value['shorten_url'] ?></a></td>
                        <td>
                           <p class="show-original-url" data-original_url="<?php echo $value['original_url'] ?>"><?php echo $value['original_url'] ?></p>
                        </td>
                        <td>
                           <p><?php echo $value['clicks'] ?></p>
                        </td>
                        <td>
                           <div>
                              <p class="show-description" data-description="<?php echo $value['description'] ?>">See description</p>
                           </div>
                        </td>
                        <td>
                           <form action="" method="post">
                              <input type="hidden" name="delete-row" value=<?php echo $value['id']  ?>>
                              <button type="submit" class="delete-action">Delete</button>
                           </form>
                        </td>
                     </tr>
                  <?php endforeach; ?>
               <?php endif; ?>
            </table>
         <?php endif; ?>
      </div>
   </main>
   <div class="popup">
      <div id="message">
         Your short link is ready.You can also edit your short link now but can't edit once you saved it.
      </div>
      <form id="form-short-url" action="" method="post">
         <label for="popup-input-url">Edit Your shorten url</label>
         <div class="popup-input-container">
            <input type="hidden" name="original_url" id="original_url">
            <input type="text" name="short_url" id="popup-input-url" autocomplete="off">
            <i id="icon-generate-url" class="fas fa-redo"></i>
            <i id="icon-selectAll" class="far fa-copy"></i>
         </div>
         <label for="description">Add a description</label>
         <input type="hidden" name="description" id="description">
         <textarea id="textarea-description" maxlength="145" placeholder="Type a description..."></textarea>
         <span id="characters-number">0 / 145</span>
         <button id="btn-submit" type="submit">Save</button>
      </form>
   </div>
   <div class="popup-description">
      <h3>Description</h3>
      <div id="close-popup-description">x</div>
      <textarea id="popup-description" maxlength="145" readonly>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae id iste consectetur aspernatur est molestiae autem recusandae eos reprehenderit, accusantium corporis laborum nesciunt debitis illum.</textarea>
   </div>
   <div class="popup-original-url">
      <h3>Original url</h3>
      <div id="close-popup-original-url">x</div>
      <div id="show-popup-original-url"></div>
   </div>
   <div class="popup-warning">
      <p>Invalid url!</p>
   </div>

   <script type="module" src="./js/app.js"></script>
</body>

</html>