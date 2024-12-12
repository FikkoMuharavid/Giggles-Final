import database from "../../config/database.mjs";

export const getUserSkill = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = "SELECT * FROM UserSkill WHERE account_id = ?";
    const [rows] = await database.query(query, [userId]);

    res.status(200).json({ message: "User skill fetched successfully", UserSkill: rows });
  } catch (error) {
    console.error(`Error fetching user skill: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postUserSkill = async (req, res) => {
  const { name } = req.body;
  try {
    const userId = req.user.id;
    const query = "INSERT INTO UserSkill (account_id, name) VALUES (?, ?)";
    const values = [userId, name];
    const [result] = await database.query(query, values);

    res.status(201).json({
      message: "User skill posted successfully",
      data: { id: result.insertId, account_id: userId, name },
    });
  } catch (error) {
    console.error(`Error posting user skill: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserSkill = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const userId = req.user.id;
    const query = "UPDATE UserSkill SET name = ? WHERE id = ? AND account_id = ?";
    const values = [name, id, userId];
    const [result] = await database.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User skill not found" });
    }

    res.status(200).json({
      message: "User skill updated successfully",
      data: { id, account_id: userId, name },
    });
  } catch (error) {
    console.error(`Error updating user skill: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const query = "DELETE FROM UserSkill WHERE id = ? AND account_id = ?";
    const [result] = await database.query(query, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User skill not found" });
    }

    res.status(200).json({ message: "User skill deleted successfully" });
  } catch (error) {
    console.error(`Error deleting user skill: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
