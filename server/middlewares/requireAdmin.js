import { clerkClient } from "@clerk/express";

export const requireAdmin = async (req, res, next) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const clerkUser = await clerkClient.users.getUser(userId);
        const isAdmin = clerkUser.privateMetadata?.role === "admin";

        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }

        // Optional but VERY useful
        req.userId = userId;
        req.adminUser = clerkUser;

        next();
    } catch (error) {
        next(error)
    }
};
