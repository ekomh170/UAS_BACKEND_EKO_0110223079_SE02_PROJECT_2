// Import Model Patient
const Patient = require('../models/Patient');

// Membuat class PatientController
class PatientController {
    /**
     * Get all patients
     * Mengambil semua data pasien dari database.
     */
    async index(req, res, next) {
        try {
            const patients = await Patient.getAll();
            res.status(200).json({
                message:
                    patients.length > 0
                        ? 'Successfully fetched all patients.'
                        : 'No patients found.',
                data: patients,
            });
        } catch (error) {
            console.error('Error in index:', error);
            next(error);
        }
    }

    /**
     * Get patient by ID
     * Mengambil detail pasien berdasarkan ID.
     */
    async show(req, res, next) {
        try {
            const patient = await Patient.getById(req.params.id);
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found.' });
            }
            res.status(200).json({
                message: 'Successfully fetched patient details.',
                data: patient,
            });
        } catch (error) {
            console.error('Error in show:', error);
            next(error);
        }
    }

    /**
     * Add a new patient
     * Menambahkan data pasien baru ke database.
     */
    async store(req, res, next) {
        try {
            const { name, phone, address, status, in_date_at, out_date_at } =
                req.body;

            // Validasi input wajib
            if (!name || !phone || !status || !in_date_at) {
                return res.status(400).json({
                    message:
                        'Required fields: name, phone, status, in_date_at.',
                });
            }

            const newPatient = await Patient.create({
                name,
                phone,
                address,
                status,
                in_date_at,
                out_date_at,
            });
            res.status(201).json({
                message: 'Patient created successfully.',
                data: newPatient,
            });
        } catch (error) {
            console.error('Error in store:', error);
            next(error);
        }
    }

    /**
     * Update patient by ID
     * Memperbarui data pasien berdasarkan ID.
     */
    async update(req, res, next) {
        try {
            const updatedPatient = await Patient.update(
                req.params.id,
                req.body
            );

            if (!updatedPatient) {
                return res.status(404).json({ message: 'Patient not found.' });
            }

            res.status(200).json({
                message: 'Patient updated successfully.',
                data: updatedPatient,
            });
        } catch (error) {
            console.error('Error in update:', error);
            next(error);
        }
    }

    /**
     * Delete patient by ID
     * Menghapus data pasien berdasarkan ID.
     */
    async destroy(req, res, next) {
        try {
            const deleted = await Patient.delete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: 'Patient not found.' });
            }

            res.status(200).json({
                message: 'Patient deleted successfully.',
            });
        } catch (error) {
            console.error('Error in destroy:', error);
            next(error);
        }
    }

    /**
     * Search patients by name
     * Mencari pasien berdasarkan nama menggunakan query.
     */
    async search(req, res, next) {
        try {
            const patients = await Patient.searchByName(req.params.name);

            res.status(200).json({
                message:
                    patients.length > 0
                        ? 'Patients search results.'
                        : 'No patients found matching the search.',
                data: patients,
            });
        } catch (error) {
            console.error('Error in search:', error);
            next(error);
        }
    }

    /**
     * Get patients by status
     * Mengambil data pasien berdasarkan status tertentu.
     */
    async getByStatus(req, res, next) {
        const { status } = req.params;

        // Validasi nilai status
        const validStatuses = ['recovered', 'positive', 'dead'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Allowed values: ${validStatuses.join(
                    ', '
                )}`,
            });
        }

        try {
            const patients = await Patient.getByStatus(status);

            res.status(200).json({
                message:
                    patients.length > 0
                        ? `Patients with status: ${status}.`
                        : `No patients found with status: ${status}.`,
                data: patients,
            });
        } catch (error) {
            console.error('Error in getByStatus:', error);
            next(error);
        }
    }
}

// Export PatientController instance
module.exports = new PatientController();
