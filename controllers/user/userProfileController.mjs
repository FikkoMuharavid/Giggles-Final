import database from "../../config/database.mjs";
import * as queries from "../../queries/profileQuery.mjs";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await database.query(queries.getUserProfile, [userId]);

    res.status(200).json({ message: "User profile fetched successfully", user: rows[0] });
  } catch (error) {
    console.error(`Error fetching user profile: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, address, bio, linkedin, twitter, instagram, phone_number, email, work_type, position } = req.body;
  try {
    const userId = req.user.id;
    const profile = req.files["profile"]?.[0];
    const resume = req.files["resume"]?.[0];

    const [currentProfile] = await database.query("SELECT user_profile, file_resume FROM UserProfile WHERE account_id = ?", [userId]);

    const query =
      "UPDATE UserProfile SET user_name = ?, user_profile = ?, user_address = ?, bio = ?, linkedin = ?, twitter = ?, instagram = ?, phone_number = ?, user_email = ?, file_resume = ?, type_of_work = ?, position = ? WHERE account_id = ?";
    const values = [name, profile?.path.replace(/^public/, '') || currentProfile[0].user_profile, address, bio, linkedin, twitter, instagram, phone_number, email, resume?.path || currentProfile[0].file_resume, work_type, position, userId];
    const [result] = await database.query(query, values);
    

    if (email) {
      await database.query("UPDATE Account SET email = ? WHERE id = ?", [email, userId]);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      data: { id: userId, name, address, bio, linkedin, twitter, instagram, phone_number, email, profile: profile?.path, resume: resume?.path, work_type, position },
    });
  } catch (error) {
    console.error(`Error updating user profile: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
