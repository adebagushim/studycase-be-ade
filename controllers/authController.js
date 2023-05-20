const passport = require('passport');
const jwt = require('jsonwebtoken');
const HttpError = require('../interface/httpError');
const { NOT_AUTHENTICATED_CODE } = require('../constant/errorCode');
const {  UNAUTHORIZED } = require('../constant/errorHttp');


const login = (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new HttpError(info.message, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
          }
          const userField = {
            name: user.name,
            _id: user._id,
            role: user.role
          }
          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
              const token = jwt.sign({ userId: user._id, name: user.name, role: user.role }, 'myscreet', { expiresIn: '1800s' });
              return res.status(200).json({ message: 'success', data: { user: userField, token }});
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  };


const me = (req, res, next) => {
    if(!req.User){
        res.json({
            err: 1,
            message: `You're not login or token expired`
          })
    }
    res.json(req.user);
}

module.exports = {
    login,
    me
};