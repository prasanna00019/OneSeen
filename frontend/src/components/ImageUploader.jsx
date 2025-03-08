import React, { useState } from "react";
import axios from "axios";
const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const CLOUD_NAME = "duccgjatp"; // Replace with your Cloudinary Cloud Name
  const UPLOAD_PRESET = "prasanna"; // Replace with your Upload Preset

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  const uploadImage = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);

    try {
      setUploading(true);
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
      setImageUrl(data.secure_url);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 rounded" />}
      <button onClick={uploadImage} disabled={uploading} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {imageUrl && (
        <p className="mt-2">
          Uploaded Image URL:{" "}
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
