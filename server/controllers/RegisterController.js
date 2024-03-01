import User from "../models/User.js";
import bcrypt from "bcrypt";

/**
 *  Register a new user.
 *
 * @param {Object} request
 * @param {Object} response
 */
const register = async (request, response, next) => {
  try {
    const { name, email, password } = request.body;

    const nameCheck = await User.findOne({ name });

    if (nameCheck) {
      return response.json({
        msg: "name already used",
        status: false,
      });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return response.json({
        msg: "Email already used",
        status: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    delete user.password;

    return response.json({
      status: true,
      user,
    });
  } catch (ex) {
    next(ex);
  }
};

export { register };
