<?php

namespace app\database;

use PDO;
use PDOException;

/**
 * Class Database
 * @package app\core
 */

class Database
{
   private PDO $pdo;
   private string $dsn;
   private string $username;
   private string $password;

   /**
    * When this class initialize the PDO Will conect to the database
    * @param array $arr_database
    * @return void
    */

   public function __construct(array $arr_database) 
   {
      // database configuration 
      $this->dsn = $arr_database['db_dsn'];
      $this->username = $arr_database['db_user'];
      $this->password = $arr_database['db_password'];

      try {
         $this->pdo = new PDO($this->dsn, $this->username, $this->password);
      } 
      catch (PDOException $e) {
         echo $e->getMessage();
         exit;
      }
   }

   /**
    * Add a the original url,shorten url and the description of the shorten url to the database's table short_links
    *
    * @param string $original_url
    * @param string $short_url
    * @param string $description
    * @return void
    * 
    */

   public function addDatabase(string $original_url, string $short_url, string $description)
   {
      $query = "INSERT INTO short_links(shorten_url,original_url,description) VALUES(:short_url,:original_url,:description)";

      try {

         $statement = $this->pdo->prepare($query);
         $statement->bindValue(':short_url', $short_url);
         $statement->bindValue(':original_url', $original_url);
         $statement->bindValue(':description', $description);
         $statement->execute();

      } 
      catch (PDOException $e) {
         echo $e->getMessage();
         exit;
      }
   }

   /**
    * Return all the data in descending order or false
    * @return array|false
    */

   public function fetchDatabase()
   {
      $query = "SELECT * FROM short_links ORDER BY created_at DESC;";

      try {

         $statement = $this->pdo->prepare($query);
         $statement->execute();

         return $statement->fetchall(PDO::FETCH_ASSOC);
         
      } 
      catch (PDOException $e) {

         echo $e->getMessage();
         exit;
      }
   }

   /**
    * Return the number of rows of the database's table short_links
    * @return int
    */

   public function totalRowsDatabase()
   {
      $query = "SELECT * FROM short_links";

      try {

         $statement = $this->pdo->prepare($query);
         $statement->execute();

         return $statement->rowCount();

      } 
      catch (PDOException $e) {

         echo $e->getMessage();
         exit;

      }
   }

   /**
    * Return the sum of all shorten urls' clicks
    * @return mixed
    */

   public function sumAllClicks()
   {
      $query = "Select sum(clicks) as sum_clicks FROM short_links";

      try {

         $statement = $this->pdo->prepare($query);
         $statement->execute();

         return $statement->fetch(PDO::FETCH_ASSOC);

      } catch (PDOException $e) {
         echo $e->getMessage();
         exit;
      }
   }

   /**
    * Delete a single shorten url
    * @param string $id
    * @return void
    */

   public function deleteRow(string $id)
   {
      $query = "DELETE FROM short_links WHERE id=:id";

      try {

         $statement = $this->pdo->prepare($query);
         $statement->bindValue(':id', $id);
         $statement->execute();

      } 
      catch (PDOException $e) {
         echo $e->getMessage();
         exit;
      }
   }

   /**
    * Delete all the shorten urls
    * @return void
    */

   public function deleteAllRows()
   {
      try {

         $query = "DELETE FROM short_links";
         $statement = $this->pdo->prepare($query);
         $statement->execute();

      } 
      catch (PDOException $e) {
         echo $e->getMessage();
         exit;
      }
   }

   /**
    * Return the original url or false
    * @param mixed $shorten_url
    * @return mixed
    */

   public function selectOriginalUrl(string $shorten_url)
   {
      $query = "SELECT original_url FROM short_links WHERE shorten_url=:shorten_url";

      try {

         $statement = $this->pdo->prepare($query);
         $statement->bindValue(':shorten_url', 'localhost/url/' . $shorten_url);
         $statement->execute();

         return ($statement->rowCount() === 1) ? $statement->fetch(PDO::FETCH_ASSOC)['original_url'] : false;

      } 
      catch (PDOException $e) {
         echo $e->getMessage();
         exit;
      }
   }

   /**
    * Update a shorten url's number of cliks
    * @param string $shorten_url
    * @return void
    */

   public function UpdateClicks(string $shorten_url)
   {
      $query = "UPDATE short_links SET clicks = clicks + 1 WHERE shorten_url = :shorten_url";

      try {

         $statement = $this->pdo->prepare($query);
         $statement->bindValue(':shorten_url', 'localhost/url/' . $shorten_url);
         $statement->execute();

      } 
      catch (PDOException $e) {
         echo $e->getMessage();
         exit;
      }
   }

}
