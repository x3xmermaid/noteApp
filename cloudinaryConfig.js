const {config} =require('cloudinary');
const {uploader} =require('cloudinary');

const cloudinaryConfig = (req, res, next) => {
    config({
    cloud_name: dvyonb6zt,
    api_key: 669188571915784,
    api_secret: puylDRecNQxm2NQNhBeLlPqHjLg,
 });
 next();
}
// export { cloudinaryConfig, uploader };
// export.config = config
// export.uploader = uploader