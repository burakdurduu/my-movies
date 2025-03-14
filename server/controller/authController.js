import bcryptjs from "bcryptjs";
import crypto from "crypto";
import prisma from "../db/prisma.js";
import generateToken from "../utils/generateToken.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../nodemailer/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const verificationToken = Math.floor(
      10000 + Math.random() * 900000
    ).toString();
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        verificationToken: verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });
    if (newUser) {
      generateToken(newUser.id, res);
      await sendVerificationEmail(newUser.email, verificationToken);

      return res.status(201).json({
        message: "User created successfully",
        user: { ...newUser, password: undefined },
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateToken(user.id, res);
    user.lastLogin = new Date();
    return res.status(200).json({
      message: "Logged in successfully",
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      ...user,
      password: undefined,
    });
  } catch (error) {
    console.log("Error in getMe controller ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: code,
        verificationTokenExpiresAt: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token",
      });
    }

    const verifiedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    });

    await sendWelcomeEmail(user.email, user.name);

    return res.status(200).json({
      message: "Email verified successfully",
      user: { ...verifiedUser, password: undefined },
    });
  } catch (error) {
    console.error("Error in verifyEmail controller ", error);
    return res.status(500).json({ message: "Email verification failed" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ messager: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { email: email },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: resetTokenExpiresAt,
      },
    });

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgotPassword controller ", error);
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: { gt: new Date() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
    });

    sendResetSuccessEmail(user.email);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in resetPassword controller ", error);
    res.status(500).json({ message: error.message });
  }
};
