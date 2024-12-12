import express from 'express';
import { loginUser } from '../controllers/loginUserController.mjs';
import { authenticate } from '../middlewares/authMiddleware.mjs'; // Middleware untuk otentikasi user

const router = express.Router();

// Rute untuk login user
router.post('/login', loginUser);

// Rute yang dilindungi, hanya bisa diakses oleh user yang sudah login
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({
    message: 'This is a protected route for user',
    user: req.user,
  });
});

export default router;
