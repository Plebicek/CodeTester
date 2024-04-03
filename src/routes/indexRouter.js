import {Router} from 'express';
import { homepage } from '../contollers/indexController.js';

const router = Router()

router.get('/', homepage)

export default router