/*
 Navicat MySQL Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : exam

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 20/12/2019 08:06:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `product_price` decimal(10,0) DEFAULT NULL,
  `product_num` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (1, '迪奥', 145, 1);
INSERT INTO `product` VALUES (2, '纪梵希', 345, 13);
INSERT INTO `product` VALUES (3, '膜法世家', 200, 34);
INSERT INTO `product` VALUES (4, '香奈儿', 567, 23);
INSERT INTO `product` VALUES (5, 'skll', 2000, 10000);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
