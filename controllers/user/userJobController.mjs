import database from "../../config/database.mjs";

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const query = "SELECT PostJob.* FROM PostJob LEFT JOIN ApplyJob ON PostJob.id = ApplyJob.job_id WHERE ApplyJob.account_id = ?";
    const [rows] = await database.query(query, [userId]);

    res.status(200).json({ message: "Jobs fetched successfully", jobs: rows });
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestJobs = async (req, res) => {
  try {
    const query = "SELECT * FROM PostJob ORDER BY time DESC";
    const [rows] = await database.query(query);

    res.status(200).json({ message: "Latest jobs fetched successfully", jobs: rows });
  } catch (error) {
    console.error(`Error fetching latest jobs: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJobByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const query = "SELECT * FROM PostJob WHERE category = ?";
    const [rows] = await database.query(query, [category]);

    res.status(200).json({ message: "Jobs fetched successfully", jobs: rows });
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const showJob = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM PostJob WHERE id = ?";
    const [rows] = await database.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job fetched successfully", job: rows[0] });
  } catch (error) {
    console.error(`Error fetching job: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const applyJob = async (req, res) => {
  const { job_id } = req.params;
  try {
    const userId = req.user.id;

    const query = "INSERT INTO ApplyJob (job_id, account_id) VALUES (?, ?)";
    const [result] = await database.query(query, [job_id, userId]);

    if (result.insertId) {
      const [userRows] = await database.query("SELECT user_name FROM UserProfile WHERE account_id = ?", [userId]);
      const [companyRows] = await database.query("SELECT * FROM PostJob WHERE id = ?", [job_id]);

      if (userRows.length > 0 && companyRows.length > 0) {
        const user = userRows[0];
        const company = companyRows[0];

        const notifTitle = "New Application!";
        const notifMessage = `${user.user_name} just applied for ${company.position} in your company!`;

        const notifQuery = "INSERT INTO Notification (account_id, title, message, job_id) VALUES (?, ?, ?, ?)";
        const notifValues = [company.company_id, notifTitle, notifMessage, job_id];
        await database.query(notifQuery, notifValues);
      }
    }

    res.status(201).json({ message: "Job applied successfully", data: { id: result.insertId, job_id, account_id: userId } });
  } catch (error) {
    console.error(`Error applying job: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
