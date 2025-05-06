const rbacMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!userRole) {
            return res.status(403).json({ message: "Access denied. No role found." });
        }

        if (userRole !== requiredRole && userRole !== "admin") {
            return res.status(403).json({ message: "Access denied. You do not have permission to perform this action." });
        }

        next();
    };
};

export default rbacMiddleware;
