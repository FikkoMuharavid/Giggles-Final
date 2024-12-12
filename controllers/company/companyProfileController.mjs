import database from "../../config/database.mjs";
import * as queries from "../../queries/profileQuery.mjs";

export const getCompanyProfile = async (req, res) => {
  try {
    const companyId = req.user.id;
    const [rows] = await database.query(queries.getCompanyProfile, [companyId]);

    res.status(200).json({ message: "Company profile fetched successfully", user: rows[0] });
  } catch (error) {
    console.error(`Error fetching company profile: ${error.message}`);
    res.status(500).json({ mevssage: "Internal Server Error" });
  }
};

export const updateCompanyProfile = async (req, res) => {
  const { name, address, location, website, phone_number, headline, body, visi, misi, email } = req.body;
  try {
    const companyId = req.user.id;
    const profile = req.files["profile"]?.[0];

    const [currentProfile] = await database.query("SELECT company_profile FROM CompanyProfile WHERE account_id = ?", [companyId]);

    const query =
      "UPDATE CompanyProfile SET company_name = ?, company_profile = ?, company_address = ?, company_location = ?, company_email = ?, website = ?, phone_number = ?, about_headline = ?, about_body = ?, about_visi = ?, about_misi = ? WHERE account_id = ?";
    const values = [name, profile?.path.replace(/^public/, '') || currentProfile[0].company_profile, address, location, email, website, phone_number, headline, body, visi, misi, companyId];
    const [result] = await database.query(query, values);

    if (email) {
      await database.query("UPDATE Account SET email = ? WHERE id = ?", [email, companyId]);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company profile updated successfully",
      data: { id: companyId, name, address, location, website, phone_number, headline, body, visi, misi, profile: profile?.path },
    });
  } catch (error) {
    console.error(`Error fetching user profile: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
