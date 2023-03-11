const jwt = require('jsonwebtoken');
module.exports = {
  auth: async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.send({ code: 403, message: 'Unauthorized User' });
      }
      const decoderUser = await jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
      // Date.now() is in milisecond and decoderUser.exp is in second so we divide Date.now() by 1000 to convert into second
      if (Date.now() / 1000 >= decoderUser.exp) {
        return res.send({ code: 403, message: 'TOKEN_EXPIRED' });
      }
      req.user = decoderUser;
      req['permissions'] = decoderUser.roles[0].permissions;
      // req["user"] = decoderUser;
      // req["permissions"] = decoderUser.roles[0].permissions;
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).send('Token Expired');
    }
  },
};
