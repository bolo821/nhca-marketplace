import routerx from 'express-promise-router'
import { save, get, edit, view } from '../controllers/usersController'
const router = routerx()

router.post('/save', save)
router.post('/get', get)
router.post('/edit', edit)
router.get('/view', view)

export default router