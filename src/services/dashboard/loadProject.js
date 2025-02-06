import { portfolioClient } from "../config";
import { message } from "antd";

export const loadProject = async (projectId) => {
    try {
        let { data, error } = await portfolioClient
            .from("projects")
            .select("*")
            .match({ id: projectId })
            .single();

        if (error) throw error;

        let { data: downloadCoverUrl, error: coverError } = portfolioClient.storage
            .from("projects")
            .getPublicUrl(`Thumbnail/${data.image}`);

        if (coverError) {
            console.error("Error fetching cover photo URL:", coverError);
            throw coverError;
        }
        return {
            ...data,
            features: data?.features ? JSON.parse(data.features) : [],
            technologies: data?.technologies ? JSON.parse(data.technologies) : [],
            coverphoto: downloadCoverUrl.publicUrl
        };
    } catch (error) {
        message.error(error)
    }
}