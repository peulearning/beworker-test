export const authconfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "default",
    expireIn: "1d",
  },
};