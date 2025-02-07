import { portfolioClient } from "../config";
import { message } from "antd";

export const createProject = async (session, projects, file,navigate) => {

    const date = new Date().toLocaleDateString();

    const { title, githublink, livelink, project_type, features, technologies, design_source } = projects

    try {
        const { error: projectInsertError } = await portfolioClient
            .from("projects")
            .insert({
                user_id: session.user.id,
                title: title,
                image: file.name,
                githublink: githublink,
                livelink: livelink,
                project_type: project_type,
                features: features,
                technologies: JSON.stringify(technologies),
                design_source: JSON.stringify(design_source),
                inserted_at: date,
            })
            .single();
        if (projectInsertError) {
            message.error("Error inserting project:", projectInsertError.message);
        }

        let { error: uploadError } = await portfolioClient.storage
            .from("projects")
            .upload(`Thumbnail/${file.name}`, file);

        if (uploadError) {
            message.error(uploadError);
        }
    }
    catch (error) {
        message.error(error)
    } finally {
        navigate("/dashboard")
        message.success('Project Successfully added!');
    }
}