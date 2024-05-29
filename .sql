create table users(
    id integer primary key AUTO_INCREMENT,
    name varchar(200) unique,
    email varchar(200) unique,
    password varchar(200),
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

create table acara(
    name varchar(100) primary key
);

create table kehadiranAcara(
    name_acara varchar(100),
    user_id integer,
    foreign key(name_acara) references acara(name),
    foreign key(user_id) references users(id)
);

CREATE TABLE acara (
  id INT AUTO_INCREMENT PRIMARY KEY,
  participant_name VARCHAR(255) NOT NULL,
  event_id INT NOT NULL,
  attendance_date DATETIME NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE
);
