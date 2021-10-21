<?php

use app\database\Database;

/**
 * If the request method is get this function will handle it.
 * Format the url and redirect to the url that was shorten.
 * Return an array with all the shorten urls and rows of the database's table short links.
 * 
 * @param \app\database\Database $database
 * @return (array|false|int)[]
 */

function handleGet(Database $database)
{

   // if there's no get variables it will format the url and redirect to the original url.
   if (!empty($_GET)) {

      $new_url = '';

      foreach ($_GET as $key => $value) {

         $u = $key;
         $new_url = str_replace('/', '', $u);
      }

      $database->UpdateClicks($new_url);

      header("Location:{$database->selectOriginalUrl($new_url)}");
      exit;
   }

   return [
      'select' => $database->fetchDatabase(),
      'rows' => $database->totalRowsDatabase()
   ];

}

/**
 * If the request method is post this function will handle it.
 * @param \app\core\Database $database
 * @return void
 */

function handlePost(Database $database)
{

   // delete a shorten url
   if (isset($_POST['delete-row'])) {

      $delete_row_id = filter_var($_POST['delete-row'], FILTER_SANITIZE_STRING);
      $database->deleteRow($delete_row_id);
      header('location:/url');
      exit;
   }

   // delete all shorten urls
   elseif (isset($_POST['delete-all-rows'])) {

      $database->deleteAllRows();
      header('location:/url');
      exit;
   }

   // add a shorten url to the database's table short links

   $original_url = filter_var($_POST['original_url'], FILTER_SANITIZE_URL);
   $short_url = filter_var($_POST['short_url'], FILTER_SANITIZE_URL);
   $description = filter_var($_POST['description'], FILTER_SANITIZE_STRING);
   $database->addDatabase($original_url, $short_url, $description);

   header('location:/url');
   exit;

}
