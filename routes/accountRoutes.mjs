import express from 'express';
import { getAccounts, addAccount } from '../controllers/accountController.mjs';

const router = express.Router();

router.get('/', getAccounts); // Endpoint untuk mendapatkan semua account
router.post('/', addAccount); // Endpoint untuk menambahkan account baru

export default router;
