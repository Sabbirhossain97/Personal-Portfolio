import { portfolioClient } from "../config";

export const getAllProjects = async () => {
    try {
        let { data: allProjectsData, error } = await portfolioClient.from("projects").select("*");
        if (error) throw error;
        const projects = allProjectsData.map((project) => {
            return {
                id: project.id,
                title: project.title,
                image: project.image,
                githublink: project.githublink,
                livelink: project.livelink,
                project_type: project.project_type,
                features: project?.features ? JSON.parse(project.features) : [],
                technologies: project?.technologies ? JSON.parse(project.technologies) : [],
                inserted_at: project.inserted_at
            }
        })
        return projects
    } catch (error) {
        console.error('Error fetching projects', error)
    }
}