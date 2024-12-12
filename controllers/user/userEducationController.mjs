import database from "../../config/database.mjs";

export const getUserEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = "SELECT * FROM UserEducation WHERE account_id = ?";
    const [rows] = await database.query(query, [userId]);

    res.status(200).json({ message: "User education fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching user education: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postUserEducation = async (req, res) => {
  const { school_name, degree, start_date, end_date, description } = req.body;
  try {
    const userId = req.user.id;
    const query = "INSERT INTO UserEducation (account_id, school_name, degree, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [userId, school_name, degree, start_date, end_date, description];
    const [result] = await database.query(query, values);

    res.status(201).json({
      message: "User education posted successfully",
      data: { id: result.insertId, account_id: userId, school_name, degree, start_date, end_date, description },
    });
  } catch (error) {
    console.error(`Error posting user education: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserEducation = async (req, res) => {
  const { id } = req.params;
  const { school_name, degree, start_date, end_date, description } = req.body;
  try {
    const userId = req.user.id;
    const query = "UPDATE UserEducation SET school_name = ?, degree = ?, start_date = ?, end_date = ?, description = ? WHERE id = ? AND account_id = ?";
    const values = [school_name, degree, start_date, end_date, description, id, userId];
    const [result] = await database.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User education not found" });
    }

    res.status(200).json({
      message: "User education updated successfully",
      data: { id, account_id: userId, school_name, degree, start_date, end_date, description },
    });
  } catch (error) {
    console.error(`Error updating user education: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const query = "DELETE FROM UserEducation WHERE id = ? AND account_id = ?";
    const [result] = await database.query(query, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User education not found" });
    }

    res.status(200).json({ message: "User education deleted successfully" });
  } catch (error) {
    console.error(`Error deleting user education: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
