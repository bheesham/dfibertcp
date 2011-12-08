/*
Navicat MySQL Data Transfer

Source Server         : Localhost
Source Server Version : 50144
Source Host           : localhost:3306
Source Database       : dftorrents

Target Server Type    : MYSQL
Target Server Version : 50144
File Encoding         : 65001

Date: 2011-07-18 17:18:47
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `dft_torrents`
-- ----------------------------
DROP TABLE IF EXISTS `dft_torrents`;
CREATE TABLE `dft_torrents` (
  `tid` mediumint(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` mediumint(11) unsigned NOT NULL,
  `transmission_id` mediumint(11) unsigned NOT NULL DEFAULT '0',
  `orig_name` text CHARACTER SET utf8 NOT NULL,
  `real_name` text CHARACTER SET utf8 NOT NULL,
  `md5_of_torrent` varchar(200) CHARACTER SET utf8 NOT NULL,
  `hash_of_torrent` varchar(200) CHARACTER SET utf8 NOT NULL,
  `torrent_name` text CHARACTER SET utf8 NOT NULL,
  `size` mediumint(11) unsigned NOT NULL COMMENT 'Size of the completed torrent (MB)',
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dft_torrents
-- ----------------------------

-- ----------------------------
-- Table structure for `dft_users`
-- ----------------------------
DROP TABLE IF EXISTS `dft_users`;
CREATE TABLE `dft_users` (
  `uid` mediumint(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(75) CHARACTER SET utf8 NOT NULL,
  `password` varchar(150) CHARACTER SET utf8 NOT NULL COMMENT 'SHA1 ( MD5 ( $password ) )',
  `max_uploaded_torrents` int(3) unsigned NOT NULL DEFAULT '1' COMMENT 'The maximum amount of torrents the user is allowed to upload.',
  `total_disk_usage` mediumint(11) unsigned NOT NULL DEFAULT '0' COMMENT 'This is the total size of all their added torrents. When a torrent is deleted, and it''s files are removed, it''s size will be deducted from this total. (MB)',
  `max_total_disk_usage` mediumint(11) unsigned NOT NULL DEFAULT '100' COMMENT 'The maximum disk usage the user is allowed to have. Their total size of all their torrents cannt exceed this number. (MB)',
  `max_upload_per_torrent` mediumint(11) unsigned NOT NULL COMMENT 'The maximum upload speed the user is allowed to set. In KiloBytes (KiB).',
  `max_download_per_torrent` mediumint(11) unsigned NOT NULL COMMENT 'The maximum download speed the user is allowed to set. In KiloBytes (KiB).',
  `local_downloads` int(3) unsigned NOT NULL COMMENT 'How many FILES did this user download from the server?',
  `max_local_downloads` int(3) unsigned NOT NULL COMMENT 'How many files is this user allowed to download from this server?',
  `is_admin` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'Are they an admin?',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dft_users
-- ----------------------------
INSERT INTO `dft_users` VALUES ('1', 'bheesham', 'd93a5def7511da3d0f2d171d9c344e91', '5', '0', '702', '9000', '9000', '0', '0', '0');
