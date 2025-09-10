import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "e3icocyb");

  try {
    const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);

    const { secure_url, url } = res.data;
    const chosen = secure_url || url;
    if (!chosen) return undefined;
    // Force https to avoid mixed-content blocking
    return chosen.replace(/^http:\/\//i, "https://");
  } catch (err) {
    console.log(err);
  }
};

export default upload;
