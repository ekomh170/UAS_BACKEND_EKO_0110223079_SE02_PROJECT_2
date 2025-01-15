// Import express
const express = require('express');

// Import PatientController
const PatientController = require('../controllers/PatientController');

// Import middleware for authentication
// const authMiddleware = require('../middleware/auth'); // Dikomentari sementara untuk tidak diproses

// Membuat object router
const router = express.Router();

/**
 * Routing untuk Home
 * Endpoint utama untuk memeriksa apakah server berjalan
 */
router.get('/', (req, res) => {
    res.send('Hello Covid API Express');
});

/**
 * Routing untuk Patients
 * Semua routing terkait data pasien
 */

// Middleware untuk autentikasi sebelum mengakses semua endpoint di bawah
// router.use(authMiddleware); // Dikomentari sementara untuk tidak diproses

// Get All Patients
// Endpoint untuk mengambil semua data pasien
router.get('/patients', PatientController.index);

// Get Patient Detail by ID
// Endpoint untuk mendapatkan detail pasien berdasarkan ID
router.get('/patients/:id', PatientController.show);

// Add New Patient
// Endpoint untuk menambahkan data pasien baru
router.post('/patients', PatientController.store);

// Update Patient by ID
// Endpoint untuk memperbarui data pasien berdasarkan ID
router.put('/patients/:id', PatientController.update);

// Delete Patient by ID
// Endpoint untuk menghapus data pasien berdasarkan ID
router.delete('/patients/:id', PatientController.destroy);

// Search Patients by Name
// Endpoint untuk mencari pasien berdasarkan nama
router.get('/patients/search/:name', PatientController.search);

// Get Patients by Status
// Endpoint untuk mendapatkan data pasien berdasarkan status
router.get('/patients/status/:status', PatientController.getByStatus);

// Export router
module.exports = router;
