CREATE DATABASE  IF NOT EXISTS `freelance` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `freelance`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: freelance
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `Employer` varchar(45) DEFAULT NULL,
  `JobTitle` varchar(45) NOT NULL,
  `Location` varchar(45) DEFAULT NULL,
  `Compensation` decimal(25,2) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Id` varchar(45) NOT NULL,
  `Active` tinyint(4) DEFAULT '1',
  `Paid` tinyint(4) DEFAULT '0',
  `DateInvoiced` date DEFAULT NULL,
  `Rate` decimal(25,2) DEFAULT NULL,
  `HoursWorked` decimal(25,2) DEFAULT NULL,
  `Notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES ('Bryan','Sub Sandwich Assembler','Raleigh',204.00,'2020-05-22','2020-05-22','23120c9b-358e-4a8c-81e6-b96c74e2d0e5',1,0,'2020-05-22',30.00,7.00,NULL),('corning','developer','wilmington',930.06,'2020-05-30','2020-05-30','33c6e718-91e8-4cb4-8d36-8e8a0132a5e0',1,1,'2020-05-30',14.89,62.46,NULL),('Sticky Baby','Illustration','BK',350.00,'2019-11-01','2020-05-20','506d5910-e05d-4d64-88dd-12f69b46b2e3',1,1,'2020-02-02',12.00,35.00,NULL),('Charlotte Brody','Asst Designer','Fashion District',433.00,'2020-05-20','2020-05-20','6a61e2d0-9fc3-4506-81a5-1af98ba93219',1,1,'2020-05-20',13.00,35.00,NULL),('bryan','designer','wilmington',669.00,'2020-05-30','2020-05-30','7c822061-a99b-4a2a-bb34-3678e235af76',1,0,'2020-05-30',13.00,53.00,NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-01 20:29:40

