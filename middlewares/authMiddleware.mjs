import jwt from "jsonwebtoken";

// Middleware untuk otentikasi user
export const authenticate = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.header("Authorization")?.split(" ")[1];

  // Jika token tidak ada
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verifikasi token dengan secret key yang sama
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Pastikan menggunakan secret yang aman di production
    req.user = decoded; // Simpan data user di request object
    next(); // Lanjutkan ke rute berikutnya
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Middleware untuk memeriksa role jika diperlukan
export const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: `Access denied for ${role}s` });
  }
  next();
};
