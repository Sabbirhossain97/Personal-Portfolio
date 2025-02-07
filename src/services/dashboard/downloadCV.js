import { portfolioClient } from "../config";
import { saveAs } from 'file-saver';

export const downloadCv = async () => {
    try {
        const { data, error } = await portfolioClient.storage
            .from('image')
            .download('CV/CV of Sabbir Hossain.pdf')
        if (error) {
            throw error
        }
        saveAs(data, 'CV of Sabbir Hossain.pdf');
    } catch (error) {
        console.log(error)
    }
}