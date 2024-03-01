import User from "../models/User.js";

/**
 *  Get all users.
 *
 * @param {Object} request
 * @param {Object} response
 */
const users = async (request, response, next) => {
  try {
    const users = await User.find({
      _id: {
        $ne: request.params.id,
      },
    }).select(["email", "name", "avatarImage", "_id"]);

    return response.json(users);
  } catch (exception) {
    next(exception);
  }
};

const logout = async (request, response, next) => {
  try {
    if (!request.params.id) {
      return response.json({ msg: "User id is required " });
    }

    onlineUsers.delete(request.params.id);

    return response.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

export { users, logout };
