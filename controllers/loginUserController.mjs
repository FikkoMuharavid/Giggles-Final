import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import database from "../config/database.mjs";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ambil data akun berdasarkan email
    const [rows] = await database.query("SELECT * FROM Account WHERE email = ?", [email]);

    // Jika tidak ada akun dengan email tersebut
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // Verifikasi password yang dimasukkan
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Buat token JWT untuk user
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET, // Gantilah dengan environment variable untuk produksi
      { expiresIn: "1000h" } // Token expired dalam 1 jam
    );

    // Kirim token dan data user (selain password)
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(`Error during user login: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
