export const authconfig = {
  jwt:{
    secret: process.env.JWT_SECRET || 'default_secret',
    expireIn:'1d',
  },
};

