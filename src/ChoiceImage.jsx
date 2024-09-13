import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/*
format images to be fixed square size
find different API that guarantees safe images and can format size
 */
const apiKey = import.meta.env.VITE_FLICKR_API_KEY;

const fetchImageFromTag = async (tag, apiKey) => {
  const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${tag}&safe_search=1$media=photos&format=json&nojsoncallback=1&per_page=1`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.photos && data.photos.photo.length > 0) {
      const photo = data.photos.photo[0];
      return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching image for tag ${tag}:`, error);
    return null;
  }
};

function ChoiceImage({ choice }) {
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      setImage(await fetchImageFromTag(choice, apiKey));
      setLoading(false);
    };

    fetchImage();
  }, [choice, apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{choice}</h2>
      {image ? (
        <img
          src={image}
          alt={choice}
          style={{ width: "300px", height: "auto" }}
        />
      ) : (
        <p>No image found</p>
      )}
    </div>
  );
}

// Adding PropTypes validation
ChoiceImage.propTypes = {
  choice: PropTypes.string,
};

export default ChoiceImage;
