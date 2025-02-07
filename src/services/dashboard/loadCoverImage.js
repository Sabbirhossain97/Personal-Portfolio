import { portfolioClient } from "../config";

export const loadCoverImage = async (image) => {
    try {
        const { data, error } = await portfolioClient.storage
            .from("projects")
            .download(`Thumbnail/${image}`);
        if (error) throw error;
        return data
    } catch (error) {
        console.error(error)
    }
}