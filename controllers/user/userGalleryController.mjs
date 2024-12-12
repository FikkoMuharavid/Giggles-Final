import database from "../../config/database.mjs";
import * as queries from "../../queries/galleryQuery.mjs";
import * as profileQueries from "../../queries/profileQuery.mjs";

export const getUserGalleries = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await database.query("SELECT * FROM PostImage WHERE account_id = ?", [userId]);

    res.status(200).json({ message: "User galleries fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error posting company job: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postUserGallery = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const userId = req.user.id;
    const image = req.files["image"]?.[0];

    const query = "INSERT INTO PostImage (account_id, title, description, category, image_post) VALUES (?, ?, ?, ?, ?)";
    const values = [userId, title, description, category, image?.path.replace(/^public/, '')];
    const [result] = await database.query(query, values);

    res.status(201).json({
      message: "User gallery posted successfully",
      data: { id: result.insertId, account_id: userId, title, description, category, image: image?.path },
    });
  } catch (error) {
    console.error(`Error posting user gallery: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserGallery = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  try {
    const userId = req.user.id;
    const image = req.files["image"]?.[0];

    const [currentGallery] = await database.query("SELECT image_post FROM PostImage WHERE id = ?", [id]);

    const query = "UPDATE PostImage SET title = ?, description = ?, category = ?, image_post = ? WHERE id = ? AND account_id = ?";
    const values = [title, description, category, image?.path || currentGallery[0].image_post, id, userId];
    const [result] = await database.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User gallery not found" });
    }

    res.status(200).json({
      message: "User gallery updated successfully",
      data: { id, account_id: userId, title, description, category, image: image?.path },
    });
  } catch (error) {
    console.error(`Error updating user gallery: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserGallery = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const [result] = await database.query("DELETE FROM PostImage WHERE id = ? AND account_id = ?", [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User gallery not found" });
    }

    res.status(200).json({ message: "User gallery deleted successfully" });
  } catch (error) {
    console.error(`Error updating user gallery: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postRateGallery = async (req, res) => {
  const { image_id } = req.params;
  const { description, rate } = req.body;
  try {
    const userId = req.user.id;

    const query = "INSERT INTO RatingImage (image_id, account_id, rating_description, rate) VALUES (?, ?, ?, ?)";
    const values = [image_id, userId, description, rate];
    const [result] = await database.query(query, values);

    if (result.insertId) {
      const [postImageRows] = await database.query(queries.getGalleryById, [image_id]);
      const [userRows] = await database.query(profileQueries.getUserProfile, [userId]);

      if (postImageRows.length > 0 && userRows.length > 0) {
        const postImage = postImageRows[0];
        const userName = userRows[0].user_name;

        const notifTitle = "New Rating!";
        const notifMessage = `${userName} just left a rating on your post "${postImage.title}"!`;

        const notifQuery = "INSERT INTO Notification (account_id, title, message, image_id) VALUES (?, ?, ?, ?)";
        const notifValues = [postImage.account_id, notifTitle, notifMessage, image_id];
        await database.query(notifQuery, notifValues);
      }
    }

    res.status(201).json({
      message: "Rating posted successfully",
      data: { id: result.insertId, image_id, userId, description, rate },
    });
  } catch (error) {
    console.error(`Error posting rate gallery: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserCollectionGallery = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await database.query(queries.getGalleryCollection, [userId]);

    res.status(200).json({ message: "User collection galleries fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching user collection galleries: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postAddCollectionGallery = async (req, res) => {
  const { image_id } = req.params;
  try {
    const userId = req.user.id;

    const query = "INSERT INTO CollectionImage (image_id, account_id) VALUES (?, ?)";
    const values = [image_id, userId];
    const [result] = await database.query(query, values);

    res.status(201).json({
      message: "Collection added successfully",
      data: { id: result.insertId, image_id, userId },
    });
  } catch (error) {
    console.error(`Error adding collection gallery: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRatedGallery = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await database.query(queries.getRatedGalleryByUser, [userId]);

    res.status(200).json({ message: "Gallery rating fetched successfully", data: rows });
  } catch (error) {
    console.error(`Error fetching gallery rating: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
