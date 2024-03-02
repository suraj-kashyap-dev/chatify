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

/**
 *  Get all users.
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Object} next
 */
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

/**
 *  Get all users.
 *
 * @param {Object} request
 * @param {Object} response
 */
const updateStatus = async (request, response) => {
  try {
    const userId = request.params.id;

    if (!userId) {
      return response.json({ msg: "User id is required " });
    }

    const { is_active } = request.body;

    if (is_active === undefined) {
      return response.json({ msg: "is_active field is required" });
    }

    await User.findByIdAndUpdate(userId, { is_active });

    return response.status(200).send();
  } catch (error) {
    return response.status(500).json({ error: "Internal Server Error" });
  }
};
export { users, logout, updateStatus };
