DROP DATABASE IF EXISTS Tetris;

CREATE DATABASE Tetris;

USE Tetris;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, pseudo VARCHAR(10) NOT NULL, email VARCHAR(80) NOT NULL, hashedPassword VARCHAR(100) NOT NULL, profileActive BOOLEAN NOT NULL, bestScore INT NULL, bestTime Time NULL, bestBubblesExplosed INT NULL
);

CREATE TABLE game (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, score INT NOT NULL default 0, timeGame TIME NOT NULL default "00:00:00", bubblesExplosed INT NOT NULL default 0, levelOxygen INT NOT NULL default 100, levelOil INT NOT NULL default 100, colorsUnlocked INT NOT NULL DEFAULT 3, userId INT NOT NULL, CONSTRAINT fk_game_user FOREIGN KEY (userId) REFERENCES user (id)
);

CREATE TABLE bubble (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, stageLife VARCHAR(10) NOT NULL, color varchar(7) NOT NULL, positionLine INT NULL, positionColumn INT NULL, bubblesMatch TEXT NULL, bubblePartner INT NULL, gameId INT NOT NULL, CONSTRAINT fk_bubble_bubble FOREIGN KEY (bubblePartner) REFERENCES bubble(id),CONSTRAINT fk_bubble_game FOREIGN KEY (gameId) REFERENCES game (id)
);

INSERT INTO user (pseudo, email, hashedPassword, profileActive, bestScore, bestTime, bestBubblesExplosed) VALUES (
    "MajorManu", "ebonoli@hotmail.fr", "$argon2id$v=19$m=19456,t=2,p=1$tsOjbJrwYZLwn/2Gk04gbQ$hGa6IFHIrW5mRKh+tA8gmV9VhbFljJh2Y25hprnlQs4",1,0,0,0
);

INSERT INTO game (score,timeGame, bubblesExplosed, levelOxygen,levelOil, colorsUnlocked, userId) VALUES (
    0, '00:00:00',0,100,100,3,1
);

INSERT INTO bubble (stageLife,color, positionLine, positionColumn,bubblesMatch,bubblePartner, gameId) VALUES (
    "waiting", "yellow", null, null,null,null,1
),(
     "waiting", "red", null, null,null,null,1
),(
     "falling", "red", 1, 4,null,null,1
), 
( "falling", "blue", 2, 4,null,null,1),
( "stopping", "red", 10, 1,null,null,1);

UPDATE bubble SET bubblePartner = 2 WHERE id = 1;
UPDATE bubble SET bubblePartner = 1 WHERE id = 2;
UPDATE bubble SET bubblePartner = 4 WHERE id = 3;
UPDATE bubble SET bubblePartner = 3 WHERE id = 4;