const axios = require("axios");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Get a default avatar and upload it to cloudinary
 * @param {String} name to use to get initials in avatar
 * @returns {String} url to image in Cloudinary
 */
const getAvatar = async (name) => {
  const res = await axios.get("https://ui-avatars.com/api/", {
    params: {
      name,
      background: "random",
    },
    responseType: "arraybuffer",
  });

  const img =
    "data:" +
    res.headers["content-type"] +
    ";base64," +
    Buffer.from(res.data).toString("base64");

  const { url } = await cloudinary.v2.uploader.upload(img, {
    folder: "familyfoods",
    public_id: "avatar_" + name,
  });

  return url;
};

module.exports = getAvatar;
