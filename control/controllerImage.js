const multer = require('multer')
    const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})

exports.uploadImage = function (req, res, next) {
        const upload = multer({ storage }).single('image')
        upload(req, res, function(err) {

          if (err) {
            return res.send(err)
          }
          console.log('file uploaded to server')
          console.log(req.file)
      
          // SEND FILE TO CLOUDINARY
          const cloudinary = require('cloudinary').v2
          cloudinary.config({
            cloud_name: 'hys7tecaj',
            api_key: '988783636325669',
            api_secret: '-p-DJ7gvP74LwT7S2A0yYUOvins'
          })
          
          const path = req.file.path
          const uniqueFilename = new Date().toISOString()
      
          cloudinary.uploader.upload(
            path,
            { public_id: `product/${uniqueFilename}`, tags: `product` }, // directory and tags are optional
            function(err, image) {
              if (err) return res.send(err)
              console.log('file uploaded to Cloudinary')
              // remove file from server
              const fs = require('fs')
              fs.unlinkSync(path)
              // return image details
              res.json(image.url)
            }
          )
        })
}   