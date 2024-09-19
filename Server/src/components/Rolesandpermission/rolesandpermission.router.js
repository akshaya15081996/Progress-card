const express = require('express');
const router = express.Router();
const {
  saveRolesAndPermission,
  findAllRolesAndPermission,
  findRolesandpermissionById,
  updateRolesAndPermission,
  deleteRolesAndPermission
} = require('./rolesandpermission.controller');

// Routes for roles and permissions
router.post('/addrolesandpermission', saveRolesAndPermission);
router.get('/findallrolesandpermission', findAllRolesAndPermission);
router.post('/findrolesandpermissionbyid', findRolesandpermissionById);
router.post('/updaterolesandpermission', updateRolesAndPermission);
router.post('/deleterolesandpermission', deleteRolesAndPermission);

module.exports = router;





