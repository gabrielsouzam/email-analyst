import { api } from "../lib/axios";

export async function analyzeEmailFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/email/analysis/file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { data: response.data };
  } catch (error) {
    console.error("Error:", error);
    return { type: "error" };
  }
}

export async function analyzeEmailContent(content: string) {
  try {
    const response = await api.post("/email/analysis", { content });

    return { data: response.data };
  } catch (error) {
    console.error("Error:", error);
    return { type: "error" };
  }
}

