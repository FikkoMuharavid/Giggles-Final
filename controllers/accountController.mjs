import database from "../config/database.mjs";
import bcrypt from "bcrypt";

// Ambil semua data account
export const getAccounts = async (req, res) => {
  try {
    const [rows] = await database.query("SELECT * FROM Account");
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error fetching accounts: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Tambahkan account baru
export const addAccount = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const [result] = await database.query("INSERT INTO Account (email, password, role) VALUES (?, ?, ?)", [email, hashedPassword, role]);

    if (result.insertId && role === "user") {
      await database.query("INSERT INTO UserProfile (account_id, user_email) VALUES (?, ?)", [result.insertId, email]);
    } else if (result.insertId && role === "company") {
      await database.query("INSERT INTO CompanyProfile (account_id, company_email) VALUES (?, ?)", [result.insertId, email]);
    }

    res.status(201).json({ message: "Account created successfully", id: result.insertId });
  } catch (error) {
    console.error(`Error adding account: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const addAccount = async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//     const [result] = await database.query(
//       'INSERT INTO Account (email, password, role) VALUES (?, ?, ?)',
//       [email, password, role]
//     );
//     res.status(201).json({ message: 'Account created successfully', id: result.insertId });
//   } catch (error) {
//     console.error(`Error adding account: ${error.message}`);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
