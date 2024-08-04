const express = require("express");
const router = express.Router();
const db = require("../../repository/db");

router.post("/api/getprofile", async (req, res) => {
  const { user_id } = req.body;
  try {
    const checkUserQuery = `SELECT * FROM users WHERE user_id=${user_id}`;
    console.log(checkUserQuery);
    const { rows } = await db.query(checkUserQuery);
    if (rows.length < 1) {
      return res.status(400).json({
        message: "User Doesn't Exist",
      });
    }
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error inserting into application table:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/api/updateprofile", async (req, res) => {
    const { user_id,name, email, phone, address } = req.body;
    try {
        const updateUser = `
                UPDATE users
                SET name = $2, email = $3, phone =$4, address=$5
                WHERE user_id = $1
            `;
        await db.query(updateUser, [
            user_id,
            name,  email, phone, address
        ]);
      res.status(200).send('{"success": "true"}');
      
    } catch (err) {
      console.error("Error inserting into application table:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;