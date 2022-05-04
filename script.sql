CREATE TABLE `short_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shorten_url` varchar(255) DEFAULT NULL,
  `original_url` varchar(255) NOT NULL,
  `clicks` int DEFAULT '0',
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shorten_url` (`shorten_url`)
)