CREATE DATABASE  IF NOT EXISTS `oesystem` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `OESystem`;
-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: OESystem
-- ------------------------------------------------------
-- Server version	5.5.42-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `oe_file`
--

DROP TABLE IF EXISTS `oe_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fileName` varchar(200) DEFAULT NULL,
  `fileSize` int(11) DEFAULT NULL,
  `filePath` varchar(2000) DEFAULT NULL,
  `fileUploader` int(11) DEFAULT NULL,
  `fileUploadTime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_file`
--

LOCK TABLES `oe_file` WRITE;
/*!40000 ALTER TABLE `oe_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `oe_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_paper`
--

DROP TABLE IF EXISTS `oe_paper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_paper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paperHead` varchar(200) DEFAULT NULL,
  `paperTime` int(11) DEFAULT NULL,
  `paperChose` varchar(2000) DEFAULT NULL,
  `paperFill` varchar(2000) DEFAULT NULL,
  `paperSimple` varchar(2000) DEFAULT NULL,
  `paperPerChose` int(11) DEFAULT NULL,
  `paperPerFill` int(11) DEFAULT NULL,
  `paperPerSimple` int(11) DEFAULT NULL,
  `paperGenerateTime` varchar(45) DEFAULT NULL,
  `paperDateline` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_paper`
--

LOCK TABLES `oe_paper` WRITE;
/*!40000 ALTER TABLE `oe_paper` DISABLE KEYS */;
INSERT INTO `oe_paper` VALUES (3,'期末考试',120,'38^`39','40^`41',NULL,10,2,0,'1431763600380','1431792000000'),(4,'期中模拟考试',90,'38','40',NULL,5,10,0,'1431764974702','1432656000000');
/*!40000 ALTER TABLE `oe_paper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_subject`
--

DROP TABLE IF EXISTS `oe_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectNum` varchar(45) DEFAULT NULL,
  `subjectPoint` varchar(45) DEFAULT NULL,
  `subjectType` varchar(45) DEFAULT NULL,
  `subjectContent` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_subject`
--

LOCK TABLES `oe_subject` WRITE;
/*!40000 ALTER TABLE `oe_subject` DISABLE KEYS */;
INSERT INTO `oe_subject` VALUES (38,'010101','01','01','线性表的链式存储结构，其地址____。'),(39,'010102','01','01','静态链表中指针表示的 是__。'),(40,'020201','02','02','假设x=13，y=4，则表达式x%y!=0的值是____，其数据类型是____。'),(41,'020202','02','02','异常处理是由____、____和____块三个关键所组成的程序块。');
/*!40000 ALTER TABLE `oe_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_subject_chose`
--

DROP TABLE IF EXISTS `oe_subject_chose`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_subject_chose` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectNum` varchar(45) DEFAULT NULL,
  `subjectAnswer` varchar(45) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `subjectIndex` varchar(45) DEFAULT NULL,
  `subjectValue` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_subject_chose`
--

LOCK TABLES `oe_subject_chose` WRITE;
/*!40000 ALTER TABLE `oe_subject_chose` DISABLE KEYS */;
INSERT INTO `oe_subject_chose` VALUES (15,'010101','D',38,'A^`B^`C^`D','必须是连续的^`^`^`'),(16,'010102','B',39,'A^`B^`C^`D','内存地址^`数组下标^`下一元素地址^`左、右孩子地址');
/*!40000 ALTER TABLE `oe_subject_chose` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_subject_fill`
--

DROP TABLE IF EXISTS `oe_subject_fill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_subject_fill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectAnswer` varchar(5000) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `subjectNum` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_subject_fill`
--

LOCK TABLES `oe_subject_fill` WRITE;
/*!40000 ALTER TABLE `oe_subject_fill` DISABLE KEYS */;
INSERT INTO `oe_subject_fill` VALUES (2,'true^`boolean',40,'020201'),(3,'try^`catch^`finally',41,'020202');
/*!40000 ALTER TABLE `oe_subject_fill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_subject_point`
--

DROP TABLE IF EXISTS `oe_subject_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_subject_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pointName` varchar(45) DEFAULT NULL,
  `pointNum` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_subject_point`
--

LOCK TABLES `oe_subject_point` WRITE;
/*!40000 ALTER TABLE `oe_subject_point` DISABLE KEYS */;
INSERT INTO `oe_subject_point` VALUES (42,'数据结构','01'),(43,'Java','02'),(44,'数据库','03');
/*!40000 ALTER TABLE `oe_subject_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_subject_simple`
--

DROP TABLE IF EXISTS `oe_subject_simple`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_subject_simple` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectNum` varchar(45) DEFAULT NULL,
  `subjectAnswer` varchar(5000) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_subject_simple`
--

LOCK TABLES `oe_subject_simple` WRITE;
/*!40000 ALTER TABLE `oe_subject_simple` DISABLE KEYS */;
/*!40000 ALTER TABLE `oe_subject_simple` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_subject_type`
--

DROP TABLE IF EXISTS `oe_subject_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_subject_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(45) DEFAULT NULL,
  `typeNum` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_subject_type`
--

LOCK TABLES `oe_subject_type` WRITE;
/*!40000 ALTER TABLE `oe_subject_type` DISABLE KEYS */;
INSERT INTO `oe_subject_type` VALUES (1,'选择题','01'),(3,'填空题','02'),(4,'简答题','03');
/*!40000 ALTER TABLE `oe_subject_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_user`
--

DROP TABLE IF EXISTS `oe_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_user`
--

LOCK TABLES `oe_user` WRITE;
/*!40000 ALTER TABLE `oe_user` DISABLE KEYS */;
INSERT INTO `oe_user` VALUES (1,'admin','1',1),(2,'student','1',0);
/*!40000 ALTER TABLE `oe_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oe_user_info`
--

DROP TABLE IF EXISTS `oe_user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oe_user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `stuNumber` varchar(45) DEFAULT NULL,
  `teachNumber` varchar(45) DEFAULT NULL,
  `college` varchar(45) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oe_user_info`
--

LOCK TABLES `oe_user_info` WRITE;
/*!40000 ALTER TABLE `oe_user_info` DISABLE KEYS */;
INSERT INTO `oe_user_info` VALUES (1,1,'','1001','武汉轻工大学',1),(2,2,'110511217','','武汉轻工大学',0);
/*!40000 ALTER TABLE `oe_user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-05-19 12:45:10
