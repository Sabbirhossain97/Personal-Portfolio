import { portfolioClient } from "../config";
import { message } from "antd";

export const updateProject = async (session, projects, file, projectId, navigate) => {

    const date = new Date().toLocaleDateString();
    const { title, githublink, livelink, project_type, features, technologies, design_source, image: existingThumbnail } = projects

    try {
        const updateData = {
            user_id: session.user.id,
            title,
            githublink,
            livelink,
            project_type,
            features,
            technologies,
            design_source,
            updated_at: date,
        };

        if (file) {
            updateData.image = `${file.name}`;
        }

        const { error: updateError } = await portfolioClient
            .from("projects")
            .update(updateData)
            .match({ id: projectId });

        if (updateError) {
            console.error("Error updating project:", updateError);
            return;
        }

        if (file) {
            const targetPath = `Thumbnail/${file.name}`;

            const upsertValue = existingThumbnail === file.name ? true : false;

            const { error: uploadError } = await portfolioClient.storage
                .from("projects")
                .upload(targetPath, file, {
                    cacheControl: "3600",
                    upsert: upsertValue,
                });

            if (uploadError) {
                console.error("Error uploading new thumbnail:", uploadError);
            }
        }

    } catch (error) {
        message.error(error)
    } finally {
        navigate("/dashboard")
        message.success('Project Successfully updated!');
    }
}