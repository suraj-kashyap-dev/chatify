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
    }).select(["email", "name", "profile", "_id", "status"]);

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

    const { status } = request.body;

    if (status === undefined) {
      return response.json({ msg: "status field is required" });
    }

    await User.findByIdAndUpdate(userId, { status });

    return response.status(200).send();
  } catch (error) {
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 *  Get all users.
 *
 * @param {Object} request
 * @param {Object} response
 */
const updateProfile = async (request, response) => {
  try {
    const userId = request.params.id;

    if (!userId) {
      return response.json({ msg: "User id is required" });
    }

    if (request.file) {
      await User.findByIdAndUpdate(userId, {
        profile: request.file.filename,
      });

      return response.status(200).json({ success: "Profile Updated" });
    }

    return response.json({ msg: "No file uploaded" });
  } catch (error) {
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

export { users, logout, updateStatus, updateProfile };
