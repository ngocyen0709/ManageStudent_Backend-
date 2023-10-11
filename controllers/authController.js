import accountModel from "../models/accountModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(404).send({
        success: false,
        message: "Check your email/username or password",
      });
    }

    // Kiểm tra xem emailOrUsername là email hay username
    const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);

    // Tìm tài khoản dựa trên email hoặc username
    const account = await accountModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!account) {
      return res.status(404).send({
        success: false,
        message: "Check your email/username",
      });
    }

    const match = await comparePassword(password, account.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token
    const token = await JWT.sign(
      { accountId: account._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.status(200).send({
      success: true,
      message: "Login success",
      account: {
        accountId: account._id,
        email: account.email,
        username: account.username,
        role: account.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error when logging in",
      error,
    });
  }
};

export const getAllAccountsController = async (req, res) => {
  try {
    const Accounts = await accountModel.find({});
    res.json(Accounts);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error when get users list",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
