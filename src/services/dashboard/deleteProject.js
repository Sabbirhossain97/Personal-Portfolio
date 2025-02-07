import { portfolioClient } from "../config"
import { message } from "antd";

export const deleteProject = async (projectId) => {
    try {
        const { error } = await portfolioClient
            .from("projects")
            .delete()
            .match({ id: projectId });

        if (error) {
            message.error(error);
        } else {
            message.success("successfully deleted")
        }
    } catch (error) {
        message.error(error);
    }
}