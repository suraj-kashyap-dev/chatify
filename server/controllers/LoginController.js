import User from "../models/User.js";
import bcrypt from "bcrypt";

/**
 *  Login the user.
 *
 * @param {Object} request
 * @param {Object} response
 */
const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.json({
        msg: "Incorrect email or Password",
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.json({
        msg: "Incorrect email or Password",
        status: false,
      });
    }

    delete user.password;

    return response.json({
      status: true,
      user,
    });
  } catch (exception) {
    next(exception);
  }
};

export { login };
