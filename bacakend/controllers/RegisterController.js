import User from "../models/User.js";
import generateToken from "../configs/generateToken.js";

/**
 *  Register a new user.
 *
 * @param {Object} request
 * @param {Object} response
 */
const register = async (request, response) => {
  try {
    const { name, email, password, confirm_password } = request.body;

    if (!name || !email || !password || !confirm_password) {
      return response.status(422).send({
        success: false,
        message: "All inputs are required",
      });
    }

    if (password !== confirm_password) {
      return response.status(422).send({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    if (await User.findOne({ email: email })) {
      return response.status(422).send({
        success: false,
        message: "User already exists",
      });
    }

    if (await User.findOne({ name: name })) {
      return response.status(422).send({
        success: false,
        message: "Username is already taken",
      });
    }

    // Create a new user
    const userData = await new User({ ...request.body }).save();

    return response.status(201).send({
      success: true,
      data: userData,
      token: generateToken(userData._id),
    });
  } catch (error) {
    return response.status(500).send({
      success: false,
      message: "Internal server error",
      data: error,
    });
  }
};

export { register };
