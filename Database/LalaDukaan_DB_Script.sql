-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for laladukaan
DROP DATABASE IF EXISTS `laladukaan`;
CREATE DATABASE
IF NOT EXISTS `laladukaan` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `laladukaan`;

-- Dumping structure for table laladukaan.cartdetails
DROP TABLE IF EXISTS `cartdetails`;
CREATE TABLE
IF NOT EXISTS `cartdetails`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE
IF NOT EXISTS `category`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `ParentCategoryID` int
(11) NOT NULL DEFAULT 0,
  `CategoryName` varchar
(150) NOT NULL DEFAULT '0',
  PRIMARY KEY
(`ID`),
  KEY `FK_category_parentcategory`
(`ParentCategoryID`),
  CONSTRAINT `FK_category_parentcategory` FOREIGN KEY
(`ParentCategoryID`) REFERENCES `parentcategory`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.department
DROP TABLE IF EXISTS `department`;
CREATE TABLE
IF NOT EXISTS `department`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `DepartmentName` varchar
(150) NOT NULL DEFAULT '0',
  PRIMARY KEY
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE
IF NOT EXISTS `order` (
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `UserOrderID` int
(11) NOT NULL DEFAULT 0,
  `UserProfileID` int
(11) NOT NULL DEFAULT 0,
  `OrderNumber` varchar
(150) DEFAULT '0',
  `OrderDate` datetime NOT NULL,
  `PaymentID` varchar
(200) DEFAULT '0',
  `TransactionStatus` varchar
(100) DEFAULT NULL,
  `ShippingDate` datetime DEFAULT NULL,
  PRIMARY KEY
(`ID`),
  KEY `FK_userorder_userprofile`
(`UserProfileID`),
  CONSTRAINT `FK_userorder_userprofile` FOREIGN KEY
(`UserProfileID`) REFERENCES `userprofile`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.orderdetails
DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE
IF NOT EXISTS `orderdetails`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `OrderID` int
(11) NOT NULL DEFAULT 0,
  `SKUID` int
(11) NOT NULL DEFAULT 0,
  `OrderNumber` varchar
(255) DEFAULT '0',
  `Price` decimal
(10,2) DEFAULT NULL,
  `Quantity` int
(11) DEFAULT NULL,
  `Discount` varchar
(50) DEFAULT NULL,
  `Total` decimal
(10,2) DEFAULT NULL,
  `Size` varchar
(50) DEFAULT NULL,
  `ShipDate` datetime DEFAULT NULL,
  PRIMARY KEY
(`ID`),
  KEY `FK_orderdetails_order`
(`OrderID`),
  KEY `FK_orderdetails_sku`
(`SKUID`),
  CONSTRAINT `FK_orderdetails_order` FOREIGN KEY
(`OrderID`) REFERENCES `order`
(`ID`),
  CONSTRAINT `FK_orderdetails_sku` FOREIGN KEY
(`SKUID`) REFERENCES `sku`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.parentcategory
DROP TABLE IF EXISTS `parentcategory`;
CREATE TABLE
IF NOT EXISTS `parentcategory`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `DepartmentID` int
(11) NOT NULL DEFAULT 0,
  `ParentCategoryName` varchar
(150) NOT NULL DEFAULT '0',
  PRIMARY KEY
(`ID`),
  KEY `FK_parentcategory_department`
(`DepartmentID`),
  CONSTRAINT `FK_parentcategory_department` FOREIGN KEY
(`DepartmentID`) REFERENCES `department`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.payments
DROP TABLE IF EXISTS `payments`;
CREATE TABLE
IF NOT EXISTS `payments`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `PaymentID` int
(11) NOT NULL DEFAULT 0,
  `OrderID` int
(11) NOT NULL DEFAULT 0,
  `PaymentType` varchar
(100) DEFAULT '0',
  `PaymentDate` datetime DEFAULT NULL,
  `StatusMessage` varchar
(500) DEFAULT NULL,
  PRIMARY KEY
(`ID`),
  KEY `FK__order`
(`OrderID`),
  CONSTRAINT `FK__order` FOREIGN KEY
(`OrderID`) REFERENCES `order`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.product
DROP TABLE IF EXISTS `product`;
CREATE TABLE
IF NOT EXISTS `product`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar
(150) NOT NULL DEFAULT '0',
  `CategoryID` int
(11) NOT NULL DEFAULT 0,
  PRIMARY KEY
(`ID`),
  KEY `FK_product_category`
(`CategoryID`),
  CONSTRAINT `FK_product_category` FOREIGN KEY
(`CategoryID`) REFERENCES `category`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.shippingaddress
DROP TABLE IF EXISTS `shippingaddress`;
CREATE TABLE
IF NOT EXISTS `shippingaddress`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `UserProfileID` int
(11) NOT NULL DEFAULT 0,
  PRIMARY KEY
(`ID`),
  KEY `FK__userprofile`
(`UserProfileID`),
  CONSTRAINT `FK__userprofile` FOREIGN KEY
(`UserProfileID`) REFERENCES `userprofile`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.shippingaddressdetails
DROP TABLE IF EXISTS `shippingaddressdetails`;
CREATE TABLE
IF NOT EXISTS `shippingaddressdetails`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `ShippingAddressID` int
(11) NOT NULL DEFAULT 0,
  `Address1` varchar
(255) DEFAULT '0',
  `Address2` varchar
(255) DEFAULT '0',
  `City` varchar
(100) DEFAULT '0',
  `State` varchar
(100) DEFAULT '0',
  `Country` varchar
(100) DEFAULT '0',
  `Zipcode` varchar
(100) DEFAULT '0',
  `Email` varchar
(150) DEFAULT '0',
  `Phone` varchar
(150) DEFAULT '0',
  `SpecialInstructions` varchar
(255) DEFAULT '0',
  `AdditionalInformation` varchar
(255) DEFAULT '0',
  PRIMARY KEY
(`ID`),
  KEY `FK__shippingaddress`
(`ShippingAddressID`),
  CONSTRAINT `FK__shippingaddress` FOREIGN KEY
(`ShippingAddressID`) REFERENCES `shippingaddress`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.sku
DROP TABLE IF EXISTS `sku`;
CREATE TABLE
IF NOT EXISTS `sku`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `ProductID` int
(11) NOT NULL DEFAULT 0,
  `SKUCode` varchar
(255) DEFAULT '0',
  `SKUName` varchar
(255) DEFAULT '0',
  `SKUDescription` varchar
(255) DEFAULT '0',
  `StockQuantity` int
(11) NOT NULL DEFAULT 0,
  `About` varchar
(500) DEFAULT '0',
  `HowToUse` varchar
(500) DEFAULT '0',
  `ProductInfo` varchar
(500) DEFAULT '0',
  `SupplierID` int
(11) DEFAULT 0,
  PRIMARY KEY
(`ID`),
  KEY `FK_sku_product`
(`ProductID`),
  KEY `FK_sku_suppliers`
(`SupplierID`),
  CONSTRAINT `FK_sku_product` FOREIGN KEY
(`ProductID`) REFERENCES `product`
(`ID`),
  CONSTRAINT `FK_sku_suppliers` FOREIGN KEY
(`SupplierID`) REFERENCES `suppliers`
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.suppliers
DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE
IF NOT EXISTS `suppliers`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `SupplierName` varchar
(255) NOT NULL DEFAULT '0',
  `SupplierCode` varchar
(100) NOT NULL DEFAULT '0',
  `SupplierType` varchar
(100) DEFAULT '0',
  `Address1` varchar
(255) DEFAULT '0',
  `Address2` varchar
(255) DEFAULT '0',
  `City` varchar
(100) DEFAULT '0',
  `State` varchar
(100) DEFAULT '0',
  `Country` varchar
(100) DEFAULT '0',
  `Zipcode` varchar
(100) DEFAULT '0',
  `Phone` varchar
(150) DEFAULT '0',
  `EmailID` varchar
(150) DEFAULT '0',
  PRIMARY KEY
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.usercart
DROP TABLE IF EXISTS `usercart`;
CREATE TABLE
IF NOT EXISTS `usercart`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table laladukaan.userprofile
DROP TABLE IF EXISTS `userprofile`;
CREATE TABLE
IF NOT EXISTS `userprofile`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `UserID` int
(11) NOT NULL DEFAULT 0,
  `Password` varchar
(255) NOT NULL,
  `FirstName` varchar
(100) DEFAULT '0',
  `MiddleName` varchar
(100) DEFAULT '0',
  `LastName` varchar
(100) DEFAULT '0',
  `EmailID` varchar
(150) DEFAULT '0',
  `Phone` varchar
(150) DEFAULT '0',
  `Address1` varchar
(255) DEFAULT '0',
  `Address2` varchar
(255) DEFAULT '0',
  `City` varchar
(100) DEFAULT '0',
  `State` varchar
(100) DEFAULT '0',
  `Country` varchar
(100) DEFAULT '0',
  `Zipcode` varchar
(100) DEFAULT '0',
  `UserVerified` bit
(1) NOT NULL,
  PRIMARY KEY
(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
