import database from "../../config/database.mjs";

export const getUserWork = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = "SELECT * FROM UserWork WHERE account_id = ?";
    const [rows] = await database.query(query, [userId]);

    res.status(200).json({ message: "User work fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching user work: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postUserWork = async (req, res) => {
  const { company_name, position, start_date, end_date, description } = req.body;
  try {
    const userId = req.user.id;
    const query = "INSERT INTO UserWork (account_id, company_name, position, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [userId, company_name, position, start_date, end_date, description];
    const [result] = await database.query(query, values);

    res.status(201).json({
      message: "User work posted successfully",
      data: { id: result.insertId, account_id: userId, company_name, position, start_date, end_date, description },
    });
  } catch (error) {
    console.error(`Error posting user work: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserWork = async (req, res) => {
  const { id } = req.params;
  const { company_name, position, start_date, end_date, description } = req.body;
  try {
    const userId = req.user.id;
    const query = "UPDATE UserWork SET company_name = ?, position = ?, start_date = ?, end_date = ?, description = ? WHERE id = ? AND account_id = ?";
    const values = [company_name, position, start_date, end_date, description, id, userId];
    const [result] = await database.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User work not found" });
    }

    res.status(200).json({
      message: "User work updated successfully",
      data: { id, account_id: userId, company_name, position, start_date, end_date, description },
    });
  } catch (error) {
    console.error(`Error updating user work: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserWork = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const query = "DELETE FROM UserWork WHERE id = ? AND account_id = ?";
    const [result] = await database.query(query, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User work not found" });
    }

    res.status(200).json({ message: "User work deleted successfully" });
  } catch (error) {
    console.error(`Error deleting user work: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
