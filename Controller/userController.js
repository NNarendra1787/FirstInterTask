require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRound =  10 || process.env.SaltRound;
const User = require("../Schema/userSchema");

const RegisterUser = async (req, res) => {
  try {
    const RgData = req.body;
    const { name, email, phone, password, company } = RgData;
    const userData = await User.findOne({ email: email });

    if (userData) {
      return res.send({ msg: "User Already Existed 😊😍😍😃" });
    } else {
      const salt = bcrypt.genSaltSync(saltRound);
      const hashPassword = bcrypt.hashSync(password, salt);
      const token = await jwt.sign({ Data: userData }, process.env.SecreatKey, {
        expiresIn: "2m",
      });

      const DatailsObj = await User({
        name: name,
        email: email,
        phone: phone,
        password: hashPassword,
        company: company,
      });

      const result = await DatailsObj.save();

      return res.send({
        msg: "User Register Successfully 🥳🥳😍🥳🥳",
        userId: result._id,
        token: token,
        name: name,
        email: email,
        phone: phone,
        password: password,
        company: company,
        result: result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const LoginUser = async (req, res) => {
  try {
    const LogUser = req.body;
    const { email, password } = LogUser;
    const userData = await User.findOne({ email: email });

    if (userData) {
      const hashPassword = userData.password;
      const validate = bcrypt.compareSync(password, hashPassword);
      const token = jwt.sign({ email: email }, process.env.SecreatKey, {
        expiresIn: "1h",
      });

      if (validate) {
        return res.send({
          msg: "User Login SuccessFully 😃😍🥳🙋‍♂️",
          token: token,
          userData: userData,
        });
      } else {
        return res.send({
          msg: "Invalid Credential 😔😔😔",
        });
      }
    }
    if (!userData) {
      return res.send({
        msg: "User not registed please register first 🙋‍♂️🙋‍♀️🚀",
      });
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
    RegisterUser,
    LoginUser,
}
