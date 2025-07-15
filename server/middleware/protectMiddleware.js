const protectMiddleware = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({ message: "Not Authorized" });
  }
};

export default protectMiddleware;
