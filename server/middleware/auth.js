const { verifyAuth, getUserProfile } = require('../config/database');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authorization header is required'
      });
    }

    const user = await verifyAuth(authHeader);
    const profile = await getUserProfile(user.id);
    
    req.user = user;
    req.profile = profile;
    
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Unauthorized',
      message: error.message
    });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.profile) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    const userRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!userRoles.includes(req.profile.role) && req.profile.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

const requireAdmin = requireRole(['admin']);
const requireModerator = requireRole(['admin', 'moderator']);

module.exports = {
  authMiddleware,
  requireRole,
  requireAdmin,
  requireModerator
};