import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  /**
   * Upload image buffer to Cloudinary
   */
  async upload(
    file: Express.Multer.File,
    folder = "hash-information",
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload failed"));
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  /**
   * Delete image from Cloudinary
   */
  async delete(publicId: string): Promise<void> {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  }

  /**
   * Replace existing image
   *
   * Upload new image first, then delete old image.
   */
  async replace(
    file: Express.Multer.File,
    oldPublicId?: string | null,
    folder = "hash-information",
  ): Promise<CloudinaryUploadResult> {
    const newImage = await this.upload(file, folder);

    try {
      if (oldPublicId) {
        await this.delete(oldPublicId);
      }

      return newImage;
    } catch (error) {
      // Roll back newly uploaded image if old image deletion fails
      await this.delete(newImage.publicId);

      throw error;
    }
  }
}