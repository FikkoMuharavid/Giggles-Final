import database from "../../config/database.mjs";
import * as queries from "../../queries/jobQuery.mjs";

export const getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.user.id;
    const [rows] = await database.query(queries.getJobByCompanyId, [companyId]);

    res.status(200).json({ message: "Company jobs fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching company jobs: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postCompanyJob = async (req, res) => {
  const { position, category, description } = req.body;
  try {
    const companyId = req.user.id;
    const image = req.files["image"]?.[0];

    const query = "INSERT INTO PostJob (company_id, position, category, description, image_job) VALUES (?, ?, ?, ?, ?)";
    const values = [companyId, position, category, description, image?.path.replace(/^public/, '')];
    const [result] = await database.query(query, values);

    res.status(201).json({
      message: "Company job posted successfully",
      data: { id: result.insertId, company_id: companyId, position, category, description, image: image?.path },
    });
  } catch (error) {
    console.error(`Error posting company job: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCompanyJob = async (req, res) => {
  const { id } = req.params;
  const { position, category, description } = req.body;
  try {
    const companyId = req.user.id;
    const image = req.files["image"]?.[0]?.path;

    const [currentJob] = await database.query("SELECT image_job FROM PostJob WHERE id = ?", [id]);

    const query = "UPDATE PostJob SET position = ?, category = ?, description = ?, image_job = ? WHERE id = ? AND company_id = ?";
    const values = [position, category, description, image?.path || currentJob[0].image_job, id, companyId];
    const [result] = await database.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company job not found" });
    }

    res.status(200).json({
      message: "Company job updated successfully",
      data: { id, company_id: companyId, position, category, description, image: image?.path },
    });
  } catch (error) {
    console.error(`Error updating company job: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCompanyJob = async (req, res) => {
  const { id } = req.params;
  try {
    const companyId = req.user.id;
    const [result] = await database.query("DELETE FROM PostJob WHERE id = ? AND company_id = ?", [id, companyId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company job not found" });
    }

    res.status(200).json({ message: "Company job deleted successfully" });
  } catch (error) {
    console.error(`Error deleting company job: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
