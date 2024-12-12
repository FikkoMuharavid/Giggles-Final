import database from "../config/database.mjs";
import * as queries from "../queries/jobQuery.mjs";

export const getJobs = async (req, res) => {
  const { category } = req.query;
  try {
    let rows;
    if (category) {
      [rows] = await database.query(queries.getAllJobByCategory, [category]);
    } else {
      [rows] = await database.query(queries.getAllJob);
    }

    res.status(200).json({ message: "Jobs fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestJobs = async (req, res) => {
  try {
    const [rows] = await database.query(queries.getLatestJob);

    res.status(200).json({ message: "Latest jobs fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching latest jobs: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const showJob = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await database.query(queries.getJobById, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job fetched successfully", data: rows[0] });
  } catch (error) {
    console.error(`Error fetching job: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
