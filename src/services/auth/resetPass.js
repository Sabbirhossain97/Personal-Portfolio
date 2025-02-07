import { portfolioClient } from "../config";
import { baseUrl } from "../config";
import toast from "react-hot-toast";

export const resetPass = async (email) => {
    try {
        const { error } = await portfolioClient.auth.resetPasswordForEmail(email,
            {
                redirectTo: `${baseUrl}/resetpassword`
            });
        if (error) throw error;
        toast.success("Password reset link sent to your email");
    } catch (error) {
        console.error(error);
    }
}