import jwt  from "jsonwebtoken";

const signToken = (id:string) => {
    const jwtKey:string = process.env.JWT_SECRET || ""
    return jwt.sign({ id },jwtKey, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export {signToken}
  