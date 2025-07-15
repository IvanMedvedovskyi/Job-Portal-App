import User from "../models/User.js";

export const getUserByAuth0Id = async (auth0Id) => {
  return await User.findOne({ auth0Id });
};
