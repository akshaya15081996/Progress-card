const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads"); 
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now(); 
        const filename = `${timestamp}-${file.originalname}`;

        cb(null, filename);
    }
});
const upload = multer({ storage: storage });

const fileUpload = (req, res) => {
    upload.fields([{ name: 'file' }])(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).json({ success: false, error: 'An error occurred while uploading the file' });
        }

        try {
            const { file } = req.files;
            const uploadedFiles = {
                file: file[0].filename, 
            };
            return res.status(201).json({ success: true, uploadedFiles });
        } catch (error) {
            console.error('Error handling file upload:', error);
            return res.status(500).json({ success: false, error: 'An error occurred while handling the file upload' });
        }
    });
};

module.exports = {
    fileUpload
};
