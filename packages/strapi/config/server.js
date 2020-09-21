module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3008),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a7221e3d89103e3cc4f864a2ad1c7748'),
    },
  },
});
