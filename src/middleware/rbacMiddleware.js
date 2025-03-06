const rbacMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming req.user is populated with user info

        if (!userRole) {
            return res.status(403).json({ message: "Access denied. No role found." });
        }

        if (userRole !== requiredRole && userRole !== "admin") {
            return res.status(403).json({ message: "Access denied. You do not have permission to perform this action." });
        }

        next(); // User has the required role, proceed to the next middleware or route handler
    };
};

module.exports = rbacMiddleware;
