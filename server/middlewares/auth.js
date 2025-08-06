import { clerkClient } from "@clerk/express";


export const protectAdminRoutes = async (req, res, next) => {
    try {
        const { userId } = req.auth();
        const user = await clerkClient.users.getUser(userId);

        if (user.publicMetadata.role !== "admin") {
            return res.status(500).json(
                {
                    success: false,
                    message: `not authorized to access this route`
                }
            )
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `not authorized to access this route`
        })
    }


} 