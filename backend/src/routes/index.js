import routerx from 'express-promise-router'
import users from './users'

const router = routerx()
router.use('/nfts', users)

export default router