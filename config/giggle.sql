-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 07:05 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `giggle`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','company') NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `email`, `password`, `role`, `otp`, `otp_expiry`) VALUES
(17, 'userdummy1@gmail.com', '$2b$10$mvR3HXU0Hpt0GDEMrUSk/u5K87xxyRFGQ9KY3aoUvBh9xJjybBFxa', 'user', NULL, NULL),
(18, 'userdummy2@gmail.com', '$2b$10$ALFWe26JsoTKT5nEQbJpUOwsEe/r6aonwOZxoCJhHJr0gt7F7ZSz.', 'user', NULL, NULL),
(19, 'companydummy1@gmail.com', '$2b$10$2Ezzik/QGnIwGebZU0geZOe7SyBpuQhfz5RIxpE5CnD6LLtVsJ9QG', 'company', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `applyjob`
--

CREATE TABLE `applyjob` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `apply_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collectionimage`
--

CREATE TABLE `collectionimage` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collectionimage`
--

INSERT INTO `collectionimage` (`id`, `account_id`, `image_id`) VALUES
(1, 18, 1);

-- --------------------------------------------------------

--
-- Table structure for table `companyprofile`
--

CREATE TABLE `companyprofile` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `company_profile` text DEFAULT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  `company_location` text DEFAULT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `about_headline` text DEFAULT NULL,
  `about_body` text DEFAULT NULL,
  `about_visi` text DEFAULT NULL,
  `about_misi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companyprofile`
--

INSERT INTO `companyprofile` (`id`, `account_id`, `company_name`, `company_profile`, `company_address`, `company_location`, `company_email`, `website`, `phone_number`, `about_headline`, `about_body`, `about_visi`, `about_misi`) VALUES
(1, 19, 'Microsoft', 'public\\uploads\\profile\\1733768019262-channels4_profile.webp', 'Surabaya, Indonesia', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126653.04374000418!2d112.6438367390625!3d-7.251354600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9d5ed34f32d%3A0xd8b81835f4c8b2dd!2sInstal%20ulang%20windows%20dan%20Microsoft%20office!5e0!3m2!1sid!2sid!4v1733768078930!5m2!1sid!2sid', 'companydummy1@gmail.com', 'https://www.microsoft.com/id-id', '6282144303344', 'Perusahaan teknologi paling maju sejagad raya', ' Microsoft adalah sebuah perusahaan teknologi multinasional yang didirikan oleh Bill Gates dan Paul Allen pada 4 April 1975. Berkantor pusat di Redmond, Washington, Amerika Serikat, Microsoft merupakan salah satu perusahaan teknologi terbesar di dunia.', 'Visi Microsoft adalah \"memberdayakan setiap orang dan setiap organisasi di planet ini untuk mencapai lebih banyak.\" Visi ini mencerminkan komitmen Microsoft untuk menciptakan teknologi yang inklusif, memberdayakan individu, dan memungkinkan bisnis di seluruh dunia untuk memanfaat', 'Misi Microsoft adalah menghadirkan teknologi terbaik yang dapat meningkatkan produktivitas dan inovasi di seluruh sektor kehidupan. Perusahaan ini berfokus pada pengembangan solusi berbasis AI, cloud computing, dan perangkat lunak canggih untuk memecahkan masalah global, mendukung kolaborasi, dan menciptakan dampak positif. ');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `account_id`, `title`, `message`, `image_id`, `job_id`, `is_read`, `time`) VALUES
(1, 17, 'New Rating!', 'user2 just left a rating on your post \"Glassmorphism Design\"!', 1, NULL, 1, '2024-12-09 17:59:07'),
(2, 17, 'New Rating!', 'user2 just left a rating on your post \"Glasmorphism 2\"!', 2, NULL, 1, '2024-12-09 18:04:21'),
(3, 18, 'New Rating!', 'User1 just left a rating on your post \"Glassmorphism 3\"!', 3, NULL, 0, '2024-12-09 18:08:42');

-- --------------------------------------------------------

--
-- Table structure for table `postimage`
--

CREATE TABLE `postimage` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image_post` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postimage`
--

INSERT INTO `postimage` (`id`, `account_id`, `title`, `image_post`, `description`, `category`, `time`) VALUES
(1, 17, 'Glassmorphism Design', 'public\\uploads\\image\\1733739690324-detail-image.webp', 'Glassmorphism adalah gaya desain visual yang menggunakan efek kaca buram untuk menciptakan kedalaman dan kontras antara elemen latar depan dan latar belakang. Gaya desain ini populer dalam desain Antarmuka Pengguna (UI) dan sering digunakan untuk menciptakan tampilan yang ringan, bersih, dan modern. ', 'UI/UX', '2024-12-09 10:21:30'),
(2, 17, 'Glasmorphism 2', 'public\\uploads\\image\\1733740180568-image.webp', 'Glassmorphism adalah gaya desain visual yang menggunakan efek kaca buram untuk menciptakan kedalaman dan kontras antara elemen latar depan dan latar belakang. Gaya desain ini populer dalam desain Antarmuka Pengguna (UI) dan sering digunakan untuk menciptakan tampilan yang ringan, bersih, dan modern. ', 'UI/UX', '2024-12-09 10:29:40'),
(3, 18, 'Glassmorphism 3', 'public\\uploads\\image\\1733765630189-image-1.webp', 'Glassmorphism adalah gaya desain visual yang menggunakan efek kaca buram untuk menciptakan kedalaman dan kontras antara elemen latar depan dan latar belakang. Gaya desain ini populer dalam desain Antarmuka Pengguna (UI) dan sering digunakan untuk menciptakan tampilan yang ringan, bersih, dan modern. ', 'UI/UX', '2024-12-09 17:33:50'),
(4, 18, 'Glassmorphism 4', 'public\\uploads\\image\\1733766794194-image-2.webp', 'Glassmorphism adalah gaya desain visual yang menggunakan efek kaca buram untuk menciptakan kedalaman dan kontras antara elemen latar depan dan latar belakang. Gaya desain ini populer dalam desain Antarmuka Pengguna (UI) dan sering digunakan untuk menciptakan tampilan yang ringan, bersih, dan modern. ', 'UI/UX', '2024-12-09 17:53:14'),
(5, 18, 'Glassmorphism 5', 'public\\uploads\\image\\1733766923639-image-3.webp', 'Glassmorphism adalah gaya desain visual yang menggunakan efek kaca buram untuk menciptakan kedalaman dan kontras antara elemen latar depan dan latar belakang. Gaya desain ini populer dalam desain Antarmuka Pengguna (UI) dan sering digunakan untuk menciptakan tampilan yang ringan, bersih, dan modern. ', 'UI/UX', '2024-12-09 17:55:23'),
(6, 18, 'Glassmorphism 6', 'public\\uploads\\image\\1733766988467-image-4.webp', 'Glassmorphism adalah gaya desain visual yang menggunakan efek kaca buram untuk menciptakan kedalaman dan kontras antara elemen latar depan dan latar belakang. Gaya desain ini populer dalam desain Antarmuka Pengguna (UI) dan sering digunakan untuk menciptakan tampilan yang ringan, bersih, dan modern. ', 'UI/UX', '2024-12-09 17:56:28'),
(7, 18, 'Glassmorphism 7', 'public\\uploads\\image\\1733767044329-image-5.webp', 'Glassmorphism adalah gaya desain visual yang menggunakan efek kaca buram untuk menciptakan kedalaman dan kontras antara elemen latar depan dan latar belakang. Gaya desain ini populer dalam desain Antarmuka Pengguna (UI) dan sering digunakan untuk menciptakan tampilan yang ringan, bersih, dan modern. ', 'UI/UX', '2024-12-09 17:57:24');

-- --------------------------------------------------------

--
-- Table structure for table `postjob`
--

CREATE TABLE `postjob` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `position` varchar(100) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_job` varchar(255) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postjob`
--

INSERT INTO `postjob` (`id`, `company_id`, `position`, `category`, `description`, `image_job`, `time`) VALUES
(1, 19, 'Programmer Handal', 'Programmer', 'Kami sedang mencari seorang Programmer berbakat yang siap bergabung dengan tim kami untuk menciptakan solusi inovatif melalui pengembangan perangkat lunak. Posisi ini terbuka bagi Anda yang memiliki semangat belajar tinggi, kemampuan analitis yang kuat, serta ingin berkembang di lingkungan kerja yang kolaboratif.', 'public\\uploads\\image\\1733768292686-image-4.webp', '2024-12-09 18:18:12'),
(2, 19, 'Web Design Jago, Berpengalaman, dan Kuat Berada dibawah Tekanan', 'UI/UX', 'Kami sedang mencari seorang Designer UI-UX berbakat yang siap bergabung dengan tim kami untuk menciptakan solusi inovatif melalui pengembangan perangkat lunak. Posisi ini terbuka bagi Anda yang memiliki semangat belajar tinggi, kemampuan analitis yang kuat, serta ingin berkembang di lingkungan kerja yang kolaboratif.', 'public\\uploads\\image\\1733810096017-image.webp', '2024-12-10 05:54:56');

-- --------------------------------------------------------

--
-- Table structure for table `ratingimage`
--

CREATE TABLE `ratingimage` (
  `id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `rating_description` text DEFAULT NULL,
  `rating_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `rate` tinyint(4) DEFAULT NULL CHECK (`rate` between 1 and 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratingimage`
--

INSERT INTO `ratingimage` (`id`, `image_id`, `account_id`, `rating_description`, `rating_time`, `rate`) VALUES
(1, 1, 18, 'Keren bangett kak user1', '2024-12-09 17:59:07', 5),
(2, 2, 18, 'Mantap betulll', '2024-12-09 18:04:21', 5),
(3, 3, 17, 'sip sippp', '2024-12-09 18:08:42', 5);

-- --------------------------------------------------------

--
-- Table structure for table `usereducation`
--

CREATE TABLE `usereducation` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `school_name` varchar(255) NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userprofile`
--

CREATE TABLE `userprofile` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_profile` text DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `work_history` text DEFAULT NULL,
  `education` text DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `file_resume` varchar(255) DEFAULT NULL,
  `type_of_work` enum('freelance','fulltime') DEFAULT NULL,
  `skill` text DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userprofile`
--

INSERT INTO `userprofile` (`id`, `account_id`, `user_name`, `user_profile`, `user_address`, `bio`, `work_history`, `education`, `linkedin`, `twitter`, `instagram`, `phone_number`, `user_email`, `file_resume`, `type_of_work`, `skill`, `position`) VALUES
(1, 17, 'User1', 'public\\uploads\\profile\\1733739883108-profile.webp', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '6282144303344', 'userdummy1@gmail.com', NULL, 'fulltime', NULL, 'Programmer'),
(2, 18, 'user2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '6282144303344', 'userdummy2@gmail.com', NULL, 'fulltime', NULL, 'Designer');

-- --------------------------------------------------------

--
-- Table structure for table `userskill`
--

CREATE TABLE `userskill` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userwork`
--

CREATE TABLE `userwork` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `applyjob`
--
ALTER TABLE `applyjob`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `collectionimage`
--
ALTER TABLE `collectionimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collectionimage_ibfk_1` (`account_id`),
  ADD KEY `collectionimage_ibfk_2` (`image_id`);

--
-- Indexes for table `companyprofile`
--
ALTER TABLE `companyprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_id` (`account_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_ibfk_1` (`account_id`),
  ADD KEY `notification_ibfk_2` (`image_id`),
  ADD KEY `notification_ibfk_3` (`job_id`);

--
-- Indexes for table `postimage`
--
ALTER TABLE `postimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `postjob`
--
ALTER TABLE `postjob`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `ratingimage`
--
ALTER TABLE `ratingimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `usereducation`
--
ALTER TABLE `usereducation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usereducation_ibfk_1` (`account_id`);

--
-- Indexes for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_id` (`account_id`);

--
-- Indexes for table `userskill`
--
ALTER TABLE `userskill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userskill_ibfk_1` (`account_id`);

--
-- Indexes for table `userwork`
--
ALTER TABLE `userwork`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userwork_ibfk_1` (`account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `applyjob`
--
ALTER TABLE `applyjob`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collectionimage`
--
ALTER TABLE `collectionimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `companyprofile`
--
ALTER TABLE `companyprofile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `postimage`
--
ALTER TABLE `postimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `postjob`
--
ALTER TABLE `postjob`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ratingimage`
--
ALTER TABLE `ratingimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usereducation`
--
ALTER TABLE `usereducation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userprofile`
--
ALTER TABLE `userprofile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userskill`
--
ALTER TABLE `userskill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userwork`
--
ALTER TABLE `userwork`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applyjob`
--
ALTER TABLE `applyjob`
  ADD CONSTRAINT `applyjob_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `postjob` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applyjob_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `collectionimage`
--
ALTER TABLE `collectionimage`
  ADD CONSTRAINT `collectionimage_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collectionimage_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `postimage` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `companyprofile`
--
ALTER TABLE `companyprofile`
  ADD CONSTRAINT `companyprofile_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `postimage` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`job_id`) REFERENCES `postjob` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `postimage`
--
ALTER TABLE `postimage`
  ADD CONSTRAINT `postimage_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `postjob`
--
ALTER TABLE `postjob`
  ADD CONSTRAINT `postjob_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratingimage`
--
ALTER TABLE `ratingimage`
  ADD CONSTRAINT `ratingimage_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `postimage` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratingimage_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `usereducation`
--
ALTER TABLE `usereducation`
  ADD CONSTRAINT `usereducation_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userskill`
--
ALTER TABLE `userskill`
  ADD CONSTRAINT `userskill_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userwork`
--
ALTER TABLE `userwork`
  ADD CONSTRAINT `userwork_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
