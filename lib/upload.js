import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function slugifyFolderName(input) {
  return (input || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * files: array of File objects from formData.getAll("images")
 * options.folder: e.g. "products/back-pack"
 */
export async function uploadFilesToCloudinary(files, options = {}) {
  const folder = options.folder || "products";

  const uploads = await Promise.all(
    (files || []).map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder, // ✅ category folder here
            resource_type: "image",
            overwrite: false,
          },
          (err, res) => (err ? reject(err) : resolve(res))
        );

        stream.end(buffer);
      });

      return result.secure_url;
    })
  );

  return uploads;
}
