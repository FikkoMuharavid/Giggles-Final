import database from "../config/database.mjs";
import * as queries from "../queries/galleryQuery.mjs";

export const getGalleries = async (req, res) => {
  const { category, user_id } = req.query;
  try {
    let rows;
    if (category) {
      [rows] = await database.query(queries.getAllGalleryByCategory, [category]);
    } else if (user_id) {
      [rows] = await database.query(queries.getAllGalleryByUser, [user_id]);
    } else {
      [rows] = await database.query(queries.getAllGallery);
    }

    res.status(200).json({ message: "Galleries fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching galleries: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestGalleries = async (req, res) => {
  try {
    const [rows] = await database.query(queries.getLatestGallery);

    res.status(200).json({ message: "Latest galleries fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching latest galleries: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPopularGalleries = async (req, res) => {
  try {
    const [rows] = await database.query(queries.getPopularGallery);

    res.status(200).json({ message: "Popular galleries fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching popular galleries: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const showGallery = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await database.query(queries.getGalleryById, [id]);

    if (!rows.length) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json({ message: "Gallery fetched successfully", data: rows[0] });
  } catch (error) {
    console.error(`Error fetching gallery: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGalleryRating = async (req, res) => {
  const { image_id } = req.params;
  try {
    const [rows] = await database.query(queries.getGalleryRating, [image_id]);

    res.status(200).json({ message: "Gallery ratings fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching gallery ratings: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
