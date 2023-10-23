const verifyToken = require("../utils/VerifyToken");
const getTokenFromHeader = require("../utils/getToken");

const isLoggedIn = (req, res, next) => {
  //get the token from the header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new Error("Invalid/Expired token, please login again");
  } else {
    //save the user into req obj
    req.userAuthId = decodedUser?.id;
    next();
  }
};

module.exports = isLoggedIn;
