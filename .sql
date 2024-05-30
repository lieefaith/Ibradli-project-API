create table users(
    id integer primary key AUTO_INCREMENT,
    name varchar(200) unique,
    email varchar(200) unique,
    password varchar(200),
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE `acara` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_acara` VARCHAR(255) NOT NULL,
  `tanggal_acara` DATETIME NOT NULL
);

CREATE TABLE `kehadiranacara` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_peserta` VARCHAR(255) NOT NULL,
  `event_id` INT NOT NULL,
  `tanggal_kehadiran` DATETIME NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `acara`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);