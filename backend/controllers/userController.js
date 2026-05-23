import User
from "../models/User.js";


// GET ALL USERS

export const getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()

        .select("-password")

        .sort({
          createdAt: -1
        });

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message:
        error.message
      });
    }
};