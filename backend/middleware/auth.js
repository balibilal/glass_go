import jwt from 'jsonwebtoken';

export const  isAuthunticatedUser = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new Error('please login to access this resource'))
    }

    try {
        let decoded = await jwt.verify(token, process.env.JWT_SECRET);
           req.user = decoded.user
      } catch(err) {
            next(err)
      }

      next();
}

export const isAuthorized =  (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new Error('Unauthorized user'))
        }
        next()
    }

}