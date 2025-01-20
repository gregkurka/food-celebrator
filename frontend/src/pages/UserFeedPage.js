import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const UserFeedPage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("/photos");
        setPhotos(response.data);
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div>
      <h1>User Feed</h1>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.image_url} alt={photo.caption} />
          <p>{photo.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default UserFeedPage;
