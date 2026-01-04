"use server";

import { contactFormSchema, type ContactFormData } from "@/lib/contact-schema";
import emailjs from "@emailjs/nodejs";
import { revalidatePath } from "next/cache";

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormState> {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(data);

    // Get EmailJS environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are not set");
      return {
        success: false,
        message:
          "Email service is not configured. Please contact the site administrator.",
      };
    }

    // Initialize EmailJS
    emailjs.init({
      publicKey,
      privateKey,
    });

    // Prepare template parameters
    const templateParams = {
      name: validatedData.name,
      email: validatedData.email,
      inquiry: validatedData.inquiryType,
      message: validatedData.message,
    };

    // Send email
    await emailjs.send(serviceId, templateId, templateParams);

    revalidatePath("/");

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle other errors
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}
