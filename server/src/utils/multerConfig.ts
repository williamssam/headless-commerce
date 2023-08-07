import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (file.mimetype.includes('image')) {
			cb(null, path.join(__dirname, '../files'))
		} else {
			cb(
				{ message: 'This file is not an image file', name: 'image' },
				'false'
			)
		}
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix)
	},
})
export const upload = multer({ storage })
