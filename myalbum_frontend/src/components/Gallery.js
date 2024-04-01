import { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import axios from "axios";
const photos = [
  {
    src: "http://localhost:3000/images/66057d10616cda1e412787f52024-03-28T14:41:47.184Z-1451499.png",
    width: 800,
    height: 600,
  },
  //{ src: "/images/image2.jpg", width: 1600, height: 900 },
];

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = sessionStorage.getItem("jwt");
        // Replace `YOUR_API_ENDPOINT` with the actual endpoint
        // and `YOUR_API_KEY` with your API key if required
        const response = await axios.get("http://localhost:3000/getGallery", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const original_pictures = response.data.pictures;
        const modified_array = original_pictures.map((pic) => ({
          src: "http://localhost:3000/images/" + pic.name,
          width: pic.width / 3,
          height: pic.height / 3,
        }));

        setPhotos(modified_array); // Adjust based on the API response structure
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [photos]);

  return (
    <PhotoAlbum
      layout="rows"
      columns={(containerWidth) => {
        if (containerWidth < 400) return 2;
        if (containerWidth < 800) return 3;
        return 4;
      }}
      photos={photos}
    />
  );
};
export default Gallery;
