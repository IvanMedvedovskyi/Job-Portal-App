import asyncHandler from "express-async-handler";
import { getUserByAuth0Id } from "../services/userService.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserByAuth0Id(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
