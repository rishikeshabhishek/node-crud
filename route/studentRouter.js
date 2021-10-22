const router = require("express").Router();
const StudentController = require("../controller/studentController");

const path = require("path")
const multer = require('multer')

// Setup Path -> Multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + 'am' + path.extname(file.originalname))
    }
})

const maxSize = 1 * 1024 * 1024; // for 1MB

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: {
        fileSize: maxSize
    }
});

router.get('/', StudentController.index);
router.get('/registration', StudentController.registration);
router.post('/registration', upload.single('image'), StudentController.registerStudent);
router.get('/update/(:id)', StudentController.update);
router.post('/update/update-student/(:id)', upload.single('image'), StudentController.updateStudent);
router.get('/delete/(:id)', StudentController.delete);
router.get('/getformodal/(:id)', StudentController.getForModal);
// router.get('/getimage/(:id)', StudentController.getImage);
module.exports = router;