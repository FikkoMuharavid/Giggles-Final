import database from "../config/database.mjs";

// Get "About Us" information by company ID
export const getAboutUs = async (req, res) => {
  const { companyId } = req.params;

  try {
    const [rows] = await database.query(
      "SELECT about_headline, about_body, about_visi, about_misi FROM companyprofile WHERE id = ?",
      [companyId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(`Error fetching About Us: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update "About Us" information for a company
export const updateAboutUs = async (req, res) => {
  const { companyId } = req.params;
  const { about_headline, about_body, about_visi, about_misi } = req.body;

  try {
    const [result] = await database.query(
      "UPDATE companyprofile SET about_headline = ?, about_body = ?, about_visi = ?, about_misi = ? WHERE id = ?",
      [about_headline, about_body, about_visi, about_misi, companyId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company not found or no changes made" });
    }

    res.status(200).json({ message: "About Us updated successfully" });
  } catch (error) {
    console.error(`Error updating About Us: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
