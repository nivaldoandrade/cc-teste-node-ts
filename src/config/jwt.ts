export default {
  secret: process.env.APP_SECRET || 'SecretJWT',
  expiresIn: '1d',
};
