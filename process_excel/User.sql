-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql8.freesqldatabase.com
-- Generation Time: Nov 03, 2023 at 07:24 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql8659077`
--

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserId` int(255) NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `StartTime` date NOT NULL,
  `EndTime` date NOT NULL,
  `HoursWorked` int(255) NOT NULL,
  `RatePerHour` int(255) NOT NULL,
  `SelectedSupplier` varchar(255) NOT NULL,
  `SelectedPO_Number` varchar(255) NOT NULL,
  `RegisteredDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserId`, `UserName`, `StartTime`, `EndTime`, `HoursWorked`, `RatePerHour`, `SelectedSupplier`, `SelectedPO_Number`, `RegisteredDate`) VALUES
(1, 'John', '2023-11-01', '2023-11-15', 5, 3, 'Officeworks Superstores P/L', '3093/M00019', '2023-11-03 15:57:39'),
(2, 'Tom', '2023-11-04', '2023-11-17', 118, 112, 'Bunnings - QLD', '3093/M00017', '2023-11-03 16:05:44'),
(3, 'Rohan', '2023-11-04', '2023-11-11', 18, 9, 'Reali Supply', '3093/M00022', '2023-11-03 16:13:10'),
(4, 'Marker', '2023-11-18', '2023-11-09', 6, 6, 'Master Hire', '3093/M00014', '2023-11-03 16:35:10'),
(5, 'Doe', '2023-11-17', '2023-11-09', 6, 6, 'Success Realty (QLD)', '3093/M00010', '2023-11-03 16:37:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
