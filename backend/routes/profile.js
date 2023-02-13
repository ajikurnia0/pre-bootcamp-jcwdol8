import express from 'express'
import cors from 'cors'
import { getProfileDataForEditPage, getUsernameofLoggedInUser, postUpdatedProfileDataforEditPage, uploadProfilePicToCloudinary, uploadProfilePic } from '../controllers/profile.js'
import { requireLogin } from '../utils/auth.js'
import { multerUploads } from '../utils/multer.js'

const router = express.Router()
router.use(cors())

router.use(requireLogin)
router.get('/getprofiledata', getUsernameofLoggedInUser)
router.get('/editprofiledata', getProfileDataForEditPage)
router.put('/editprofiledata', postUpdatedProfileDataforEditPage)

router.post('/upload', multerUploads.single('image'), uploadProfilePicToCloudinary)
router.put('/editProfilePic', uploadProfilePic)

export default router