import { useState, useEffect } from "react";
import choicesData from './choices.json';
/*
format images to be fixed square size
find different API that guarantees safe images and can format size
 */
const apiKey = import.meta.env.VITE_FLICKR_API_KEY;

const fetchImageForTag = async (tag, apiKey) => {
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

const ImageDisplay = ({ tag, imageUrl }) => (
  <div>
    <h2>{tag}</h2>
    {imageUrl ? <img src={imageUrl} alt={tag} style={{ width: '300px', height: 'auto' }} /> : <p>No image found</p>}
  </div>
);

const ChoiceImages = () => {
  const choices = choicesData.choices;
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAllImages = async () => {
      const imageResults = {};
      setLoading(true);
      
      // Fetch images for all tags
      await Promise.all(choices.map(async (tag) => {
        const imageUrl = await fetchImageForTag(tag, apiKey);
        imageResults[tag] = imageUrl;
      }));

      setImages(imageResults);
      setLoading(false);
    };

    fetchAllImages();
  }, [choices, apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {choices.map(tag => (
        <ImageDisplay key={tag} tag={tag} imageUrl={images[tag]} />
      ))}
    </div>
  );
};

export default ChoiceImages;
