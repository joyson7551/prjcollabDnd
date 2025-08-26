import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const options = {
    expiresIn: "48h",
  };

  const token = jwt.sign(payload, secretKey, options);
  console.log(token);
  return token;
};

export default generateToken;
