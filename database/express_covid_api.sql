-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jan 2025 pada 09.23
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express_covid_api`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text DEFAULT NULL,
  `status` enum('recovered','positive','dead') NOT NULL,
  `in_date_at` date NOT NULL,
  `out_date_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `patients`
--

INSERT INTO `patients` (`id`, `name`, `phone`, `address`, `status`, `in_date_at`, `out_date_at`) VALUES
(1, 'Eko Muchamad Haryono', '082246105463', 'Jl. Puspanegara No. 52, Bogor', 'recovered', '2025-01-01', NULL),
(3, 'Fatiya Labibah', '081234888999', 'Jl. Merdeka No. 88, Bandung', 'recovered', '2024-11-15', '2024-11-30'),
(4, 'Siti Nurhayati', '082112223344', 'Jl. Pahlawan No. 23, Semarang', 'recovered', '2025-01-10', NULL),
(5, 'Dimas Prasetyo', '085612345678', 'Jl. Gatot Subroto No. 34, Yogyakarta', 'positive', '2024-10-01', '2024-10-15'),
(6, 'Intan Wulandari', '081998877665', 'Jl. Ahmad Yani No. 7, Malang', 'dead', '2024-09-10', '2024-09-20'),
(7, 'Rizki Ramadhan', '083812345432', 'Jl. Imam Bonjol No. 11, Medan', 'dead', '2025-01-12', NULL),
(8, 'Sari Anindya', '082345678901', 'Jl. Kartini No. 19, Denpasar', 'dead', '2024-12-01', '2024-12-10'),
(9, 'Agus Saputra', '081556677889', 'Jl. Pemuda No. 6, Makassar', 'positive', '2025-01-14', NULL),
(10, 'Fitriani Zulfikar', '085755566600', 'Jl. Asia Afrika No. 4, Palembang', 'positive', '2024-08-20', '2024-09-05'),
(11, 'Syahira Laila Mutia', '0887654321', 'Jalan Indonesia Merdeka', '', '2023-02-01', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
