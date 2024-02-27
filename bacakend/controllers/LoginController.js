import User from "../models/User.js";
import generateToken from "../configs/generateToken.js";

/**
 *  Login the user.
 *
 * @param {Object} request
 * @param {Object} response
 */
const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(422).send({
        success: false,
        message: "All inputs are required",
      });
    }

    let userData = await User.findOne({ email: email });

    if (userData) {
      return response.status(201).send({
        success: true,
        data: userData,
        token: generateToken(userData._id),
      });
    }

    return response.status(201).send({
      success: false,
      message: "User not found.",
    });
  } catch (error) {
    return response.send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { login };
