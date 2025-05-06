import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '372986dd272974d092fd4126aabf41919ad6f8d1aa9fdb880f5dbc24fb3b9e975a211f349016a1210c15cf4d3c750b16b576c1463c55d5345164ff24ce2426f9fee528bdd6410050ac0fa846a3f5f64b2e5296ff1f6b0dc317ab3c4d7a180caee2da9c0291f8b7ece16faaaf4fd95b00741e4117b6fe55080588fe51f7a7ef50a2342ffa3114de25efa3da8524d1e2e8bdc3e3fbfcc4072cc1e0aeccd103b9f5d14ecf6f6d194dda728ff454c4804d8f351b1ddc623a977121664d451297685e09f342e714eb339cd6c208fca340d8507b1857b68fdbb1d47553f1051de04a371675ad1a245a1009cf71d1da16583d125b5b591a041f781bf128dcf9778c4378';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

export const generateRefreshToken = (payload) =>{
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const verifyRefreshToken = (token) =>{
  return jwt.verify(token, refreshTokenSecret);
};


export const decodeToken = (token) => {
  return jwt.decode(token);
};
