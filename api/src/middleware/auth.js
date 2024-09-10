const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Token_Secret');
    
    // Extract the user ID and role from the decoded token
    const userId = decodedToken.id;
    const userRole = decodedToken.role;

    // Check for teacher ID or student ID based on the role
    if (
      (userRole === 'teacher' && req.body.teacherid && req.body.teacherid !== userId) ||
      (userRole === 'student' && req.body.studentid && req.body.studentid !== userId) ||
      (userRole === 'admin' && req.body.adminid && req.body.adminid !== userId)
    ) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
