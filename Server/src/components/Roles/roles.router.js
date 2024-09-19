const express = require("express");

const router = express.Router()

const {saveroles,findrolesbyid,updateroles,deleteroles,findAllroles} = require('./roles.controller')
router.get('/',(req,res)=>res.json('roles loaded'))
router.post('/saveroles',saveroles)
router.get('/findAllroles',findAllroles)
router.post('/findrolesbyid',findrolesbyid)
router.post('/updateroles',updateroles)
router.post('/deleteroles',deleteroles)


module.exports = router