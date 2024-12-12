import database from "../config/database.mjs";

// Create a new post
export const createPost = async (req, res) => {
  const { userId, title, imagePost, description, category } = req.body;

  try {
    const [result] = await database.query("INSERT INTO postimage (account_id, title, image_post, description, category) VALUES (?, ?, ?, ?, ?)", [userId, title, imagePost, description, category]);

    res.status(201).json({ message: "Post created successfully", id: result.insertId });
  } catch (error) {
    console.error(`Error creating post: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all posts of a specific user
export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await database.query("SELECT * FROM postimage WHERE account_id = ?", [userId]);

    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error fetching user posts: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all posts (optional)
export const getAllPosts = async (req, res) => {
  try {
    const [rows] = await database.query("SELECT * FROM postimage");
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error fetching all posts: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
