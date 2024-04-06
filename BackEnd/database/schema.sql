DROP DATABASE IF EXISTS Tetris;

CREATE DATABASE Tetris;

USE Tetris;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, pseudo VARCHAR(10) NOT NULL, email VARCHAR(80) NOT NULL, hashedPassword VARCHAR(100) NOT NULL, profileActive BOOLEAN NOT NULL
);

CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, choiceCharacter VARCHAR(100) NOT NULL, space1Bag VARCHAR(100) NULL, space2Bag VARCHAR(100) NULL, userId INT NOT NULL, CONSTRAINT fk_settings_user FOREIGN KEY (userId) REFERENCES user (id)
);

CREATE TABLE game (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, score INT NOT NULL default 0, timeGame TIME NOT NULL, bubblesExploded INT NOT NULL default 0, colorsUnlocked INT NOT NULL DEFAULT 0, userId INT NOT NULL, CONSTRAINT fk_game_user FOREIGN KEY (userId) REFERENCES user (id)
);

CREATE TABLE bestScore (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, score INT NOT NULL, timeGame TIME NOT NULL, bubblesExploded INT NOT NULL, userId INT NOT NULL, CONSTRAINT fk_bestScore_user FOREIGN KEY (userId) REFERENCES user (id)
);

CREATE TABLE bubble (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, stageLife INT NOT NULL, color varchar(7) NOT NULL, positionLine INT NOT NULL, positionColumn INT NOT NULL, matchUp BOOLEAN NOT NULL, matchDown BOOLEAN NOT NULL, matchLeft BOOLEAN NOT NULL, matchRight BOOLEAN NOT NULL, gameId INT NOT NULL, bubbleId INT NOT NULL, CONSTRAINT fk_bubble_bubble FOREIGN KEY (bubbleId) REFERENCES bubble(id),CONSTRAINT fk_bubble_game FOREIGN KEY (gameId) REFERENCES game (id)
);

INSERT INTO user (pseudo, email, hashedPassword, profileActive) VALUES (
    "manu", "ebonoli@hotmail.fr", "blabla",1
);

INSERT INTO settings (choiceCharacter, space1Bag, space2Bag, userId) VALUES(
    "choix perso1", 'bombe', '', 1
);

INSERT INTO bestScore (score, timeGame, bubblesExploded, userId) VALUES(
    10000, SEC_TO_TIME(320), 1254, 1
);