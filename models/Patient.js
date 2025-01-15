// Import konfigurasi database
const db = require('../config/database');

// Membuat class Patient untuk mengelola data pasien
class Patient {
    /**
     * Get all patients
     * Mengambil semua data pasien dari tabel database.
     * @returns {Promise<Array>} - Data semua pasien.
     */
    static async getAll() {
        const query = 'SELECT * FROM patients';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    console.error('Error in getAll:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    /**
     * Get patient by ID
     * Mengambil data pasien berdasarkan ID.
     * @param {number} id - ID pasien.
     * @returns {Promise<Object|null>} - Data pasien atau null jika tidak ditemukan.
     */
    static async getById(id) {
        const query = 'SELECT * FROM patients WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error in getById:', err);
                    reject(err);
                } else {
                    resolve(results[0] || null);
                }
            });
        });
    }

    /**
     * Add a new patient
     * Menambahkan data pasien baru ke tabel database.
     * @param {Object} patientData - Data pasien baru.
     * @returns {Promise<Object>} - Data pasien yang berhasil ditambahkan.
     */
    static async create(patientData) {
        const query = `
            INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const { name, phone, address, status, in_date_at, out_date_at } =
            patientData;

        return new Promise((resolve, reject) => {
            db.query(
                query,
                [name, phone, address, status, in_date_at, out_date_at || null],
                (err, results) => {
                    if (err) {
                        console.error('Error in create:', err);
                        reject(err);
                    } else {
                        this.getById(results.insertId)
                            .then(resolve)
                            .catch(reject);
                    }
                }
            );
        });
    }

    /**
     * Update patient by ID
     * Memperbarui data pasien berdasarkan ID.
     * @param {number} id - ID pasien.
     * @param {Object} updatedData - Data pasien yang diperbarui.
     * @returns {Promise<Object|null>} - Data pasien yang diperbarui atau null jika tidak ditemukan.
     */
    static async update(id, updatedData) {
        const query = `
            UPDATE patients
            SET name = ?, phone = ?, address = ?, status = ?, in_date_at = ?, out_date_at = ?
            WHERE id = ?
        `;
        const { name, phone, address, status, in_date_at, out_date_at } =
            updatedData;

        return new Promise((resolve, reject) => {
            db.query(
                query,
                [
                    name,
                    phone,
                    address,
                    status,
                    in_date_at,
                    out_date_at || null,
                    id,
                ],
                (err, results) => {
                    if (err) {
                        console.error('Error in update:', err);
                        reject(err);
                    } else if (results.affectedRows === 0) {
                        resolve(null);
                    } else {
                        this.getById(id).then(resolve).catch(reject);
                    }
                }
            );
        });
    }

    /**
     * Delete patient by ID
     * Menghapus data pasien berdasarkan ID.
     * @param {number} id - ID pasien.
     * @returns {Promise<boolean>} - True jika data berhasil dihapus, false jika tidak ditemukan.
     */
    static async delete(id) {
        const query = 'DELETE FROM patients WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error in delete:', err);
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    }

    /**
     * Search patients by name
     * Mencari pasien berdasarkan nama menggunakan query LIKE.
     * @param {string} name - Nama pasien.
     * @returns {Promise<Array>} - Data pasien yang cocok dengan nama.
     */
    static async searchByName(name) {
        const query = 'SELECT * FROM patients WHERE name LIKE ?';
        return new Promise((resolve, reject) => {
            db.query(query, [`%${name}%`], (err, results) => {
                if (err) {
                    console.error('Error in searchByName:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    /**
     * Get patients by status
     * Mengambil data pasien berdasarkan status tertentu.
     * @param {string} status - Status pasien (positive, recovered, dead).
     * @returns {Promise<Array>} - Data pasien dengan status yang cocok.
     */
    static async getByStatus(status) {
        // Validasi status sebelum query
        const validStatuses = ['recovered', 'positive', 'dead'];
        if (!validStatuses.includes(status)) {
            return Promise.reject(
                new Error(
                    `Invalid status: ${status}. Allowed values: ${validStatuses.join(
                        ', '
                    )}`
                )
            );
        }

        const query = 'SELECT * FROM patients WHERE status = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [status], (err, results) => {
                if (err) {
                    console.error('Error in getByStatus:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

// Export class Patient
module.exports = Patient;
