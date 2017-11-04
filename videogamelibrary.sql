-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Nov 04, 2017 alle 17:41
-- Versione del server: 10.1.26-MariaDB
-- Versione PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `videogamelibrary`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `game`
--

CREATE TABLE `game` (
  `Id` int(11) NOT NULL,
  `Console` longtext,
  `Description` longtext,
  `Name` longtext,
  `Userid` int(11) NOT NULL,
  `Valutation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `game`
--

INSERT INTO `game` (`Id`, `Console`, `Description`, `Name`, `Userid`, `Valutation`) VALUES
(137, 'PS3', 'Uno dei primi giochi di guerra, completato al 100%', 'Call of duty: modern warfare 1 ', 135, 5),
(138, 'PS4', 'Ottimo gioco, contenuti aggiunti a pagamento -', 'Destiny 1', 135, 4),
(139, 'PS3', 'Gioco potenzialmente molto bello ma trama troppo corta, in 5 ore finito', 'Soul Calibur 5', 135, 2),
(140, '3DS', 'Gioco dalla trama interessante , completato al 100%, da confrontare col sequel ', 'Pokemon Luna', 135, 5);

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Password` longtext,
  `Username` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`Id`, `Password`, `Username`) VALUES
(135, 'pluto', 'pippo');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Game_Userid` (`Userid`);

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `game`
--
ALTER TABLE `game`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT per la tabella `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `FK_Game_User_Userid` FOREIGN KEY (`Userid`) REFERENCES `user` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
