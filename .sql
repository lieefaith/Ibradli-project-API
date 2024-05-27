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