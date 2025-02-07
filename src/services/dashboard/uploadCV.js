import { portfolioClient } from "../config";
import { message } from "antd";

export const uploadCV = async (file) => {
    try {
        const { data: existingFiles, error: listError } = await portfolioClient.storage
            .from("image")
            .list("CV/");

        if (listError) {
            throw new Error("Failed to fetch existing files");
        }

        const isFileExist = existingFiles?.some((f) => f.name === file.name);

        if (!isFileExist) {
            const { error } = await portfolioClient.storage
                .from("image")
                .upload(`CV/${file.name}`, file);

            if (error) throw new Error(error.message);
            message.success("CV uploaded successfully.");
        } else {
            const { error } = await portfolioClient.storage
                .from("image")
                .upload(`CV/${file.name}`, file, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (error) throw new Error(error.message);
            message.success("CV updated successfully.");
        }
    } catch (error) {
        message.error(error.message || "Something went wrong.");
    }
}