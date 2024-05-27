
const generateToken = require("../config/generateToken");
const { comparePassword, hashPassword } = require("../config/bcrypt");
const {
  errorResponse,
  successResponse,
  internalErrorResponse,
  notFoundResponse,
} = require("../config/responseJson");
const users = require("../models/users");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingEmail = await users.findOne({ where: { email }, attributes: ['name'] });
    if (existingEmail) {
      errorResponse(res, "Email already exists", 400);
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    await users.create({
      name,
      email,
      password: hashedPassword,
    });

  

    successResponse(res, { msg: "User registered successfully" });
  } catch (error) {
    console.log(error)
    internalErrorResponse(res, error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await users.findOne({ where: { email } });
    if (!user) {
      notFoundResponse(res, "User not found");
    }

    // Validate password
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      errorResponse(res, "Invalid password", 401);
    }

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = generateToken(user);
    successResponse(
      res,
      "Logged in successfully",
      {
        user: userResponse,
        token,
      },
      200
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    internalErrorResponse(res, error);
  }
}

async function me(req, res) {
  try {
    const user = await users.findByPk(req.user.id, {
      attributes: ["id", "name", "email"],
    });
    if (!user) {
      errorResponse(res, "User not found", 404);
    }
    successResponse(res, "User fetched successfully", user, 200);
  } catch (error) {
    console.error("Error fetching user:", error);
    internalErrorResponse(res, error);
  }
}

async function logout(req, res) {
  try {
    successResponse(res, "Logged out successfully", null, 200);
  } catch (error) {
    console.error("Error logging out user:", error);
    internalErrorResponse(res, error);
  }
}

module.exports = {
  register,
  login,
  me,
  logout,
};
