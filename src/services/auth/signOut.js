import { portfolioClient } from "../config";
import toast from "react-hot-toast";

export const signOut = async (navigate) => {
    try {
        let { error } = await portfolioClient.auth.signOut();
        if (error) {
            console.log(error);
        }
        toast.success("Logged out successfully!", {
            duration: 3000
        })
    } catch (error) {
        console.error(error)
    } finally {
        navigate("/")
    }
};