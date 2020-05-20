const express = require("express");
const router = express.Router();
const profile_controller = require("../controllers/profile.controller");
let middleware = require("../handlers/middleware");
/* const multer = require('multer');
//const util = require('util');
//const GridFsStorage = require('multer-gridfs-storage');

const storage = multer.diskStorage({
  destination : function(req, file, cb) {
    cb(null,'./public/uploads/');
  },
  filename: function (req,file,cb) {
    cb(null, new Date().toISOString()+ file.originalname);
  }
})

const fileFilter = (req, file, cb) =>{
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    cb(null,true);
  }else{
  //reject file
  cb(null,false);
}
}
const upload = multer({storage : storage,
limits:{
fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
})
  */
/* var storage =  new GridFsStorage({
url: "mongodb+srv://cs615:cs615@cs615-wqbam.mongodb.net/cs615",
options : { useNewUrlParser: true, useUnifiedTopology : true},
file: (req,file) =>{
const match = ["image/png","image/jpeg"];

if(match.indexOf(file.mimetype)=== -1){
  const filename = `${Date.now()}-profile-${file.originalname}`;
  return filename;
}

return{
  bucketName : "photos",
  filename: `${Date.now()}-profile-${file.originalname}`
};
}
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile); */

/**
 * @swagger
 * definitions:
 *   Tags:
 *     properties:
 *       label:
 *         type: string
 *       value:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Profile:
 *     properties:
 *       fullName:
 *         type: string
 *       birthday:
 *         type: string
 *       city:
 *         type: string
 *       occupation:
 *         type: string
 *       bio:
 *         type: string
 *       interests:
 *         type: array
 *         items:
 *            $ref: '#definitions/Tags'
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       emailId:
 *         type: string
 *       password:
 *         type: string
 *       profile:
 *           $ref: '#/definitions/Profile'
 */

/**
 * @swagger
 * /profile/displayprofile:
 *   get:
 *     security:
 *      - Bearer: []
 *     tags:
 *       - User
 *     description: Returns the details of current user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns the details of current user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router
  .route("/displayprofile")
  .get(middleware.checkToken)
  .get(profile_controller.display_profile);

/**
 * @swagger
 * /profile/editprofile/{id}:
 *   post:
 *     security:
 *      - Bearer: []
 *     tags:
 *       - User
 *     description: Returns the details of current user
 *     parameters:
 *       - name: id
 *         required: true
 *         type: string
 *         in: path
 *       - name: user
 *         required: true
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully Updated
 */
router
  .route("/editprofile/:id")
  .post(middleware.checkToken)
  .post(profile_controller.edit_profile);
/* uploadFilesMiddleware router.get("/test", profile_controller.test);upload.single('image') router.get("/test", profile_controller.test);*/
module.exports = router;
