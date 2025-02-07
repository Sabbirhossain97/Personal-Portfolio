import emailjs from "@emailjs/browser";
import { emailServiceId, emailPublicKey, emailTemplateId } from "../config";

export const emailService = async (form) => {

    if (!form?.current) {
        throw new Error("Invalid form reference");
    }

    try {
        const result = await emailjs.sendForm(emailServiceId, emailTemplateId, form.current, emailPublicKey);
        return result.text;
    } catch (error) {
        console.error("Failed to send email:", error.text || error.message);
        throw new Error("Failed to send email");
    }
}