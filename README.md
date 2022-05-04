# Url-Shortener

Application to generate short links with php.

## Requirements
- php 8.1
- composer
- Apache
- mysql


## Installing and start the php-builtin server
```sh
composer install
cd public/url
php -S localhost:8080
```
## Set up the apache server
Go to httpd-vhosts file and append this script
```sh
<VirtualHost *:80>
    DocumentRoot "path\Url-Shortener\public"
    ServerName localhost/url
    <Directory "path\Url-Shortener\public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```
## Set up the database
Run the script.sql on the mysql cli or mysql client
Create a env file and fill all the information needed to connect to the database


#### - Start the apache server and go tho the localhost/url


