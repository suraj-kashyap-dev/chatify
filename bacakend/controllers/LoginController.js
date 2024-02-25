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
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      response.status(422).send({
        success: false,
        message: "All inputs are required",
      });
    }

    if (await User.findOne({ email: email })) {
      response.status(422).send({
        success: false,
        message: "User is already exists",
      });
    }

    if (await User.findOne({ name: name })) {
      response.status(422).send({
        success: false,
        message: "Username is already taken",
      });
    }

    const userData = await new User({ ...request.body }).save();

    response.status(201).send({
      success: true,
      data: userData,
      token: generateToken(userData._id),
    });
  } catch (error) {
    response.status(400).send({
      success: false,
      data: error,
    });
  }
};

export { login };
