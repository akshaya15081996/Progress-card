const Rolesandpermission = require('./rolesandpermission.model');
const { sendOkResponse, sendServerError } = require('../../../core/response');
const mongoose = require('mongoose')
// Save role and permissions
const saveRolesAndPermission = async (req, res) => {
  try {
    // console.log('Form Data:', req.body); 

    const roleData = {
      roles: req.body.roles,
      permissions: req.body.permissions
    };

    const savedRole = await Rolesandpermission.create(roleData);
    sendOkResponse({ res, payload: savedRole });
  } catch (error) {
    sendServerError({ res, error });
  }
};

// Find all roles and permissions
const findAllRolesAndPermission = async (req, res) => {
  try {
    const allRoles = await Rolesandpermission.find()
      .populate({
        path: 'roles', 
        model: 'roles', 
      })
      .populate({
        path: 'permissions.permission',
        model: 'permission', 
      });

    sendOkResponse({ res, payload: allRoles });
  } catch (error) {
    sendServerError({ res, error });
  }
};

// Find role by ID
const findRolesandpermissionById = async (req, res) => {
  try {
    const { roles } = req.body;

    // Find the role by its ID
    const role = await Rolesandpermission.findOne({ roles: roles
}).populate({
  path: 'roles', 
  model: 'roles', 
})
.populate({
  path: 'permissions.permission',
  model: 'permission', 
});

    sendOkResponse({ res, payload: role });
  } catch (error) {
    console.error("Server Error:", error);
    sendServerError({ res, error });
  }
};

// Update role and permissions
const updateRolesAndPermission = async (req, res) => {
  try {
    // console.log('Update Data:', req.body);
    const { roles } = req.body;

    // Log current records to check roles
    const rolesInDb = await Rolesandpermission.find({});

    // Update the role
    const updatedRole = await Rolesandpermission.findOneAndUpdate(
      { roles: roles },  
      req.body,
      { new: true }
    ).populate('permissions.permission');

    // console.log(updatedRole, 'updatedRole');
    if (!updatedRole) {
      console.log('No document found with the provided roles.');
    }

    sendOkResponse({ res, payload: updatedRole });
  } catch (error) {
    console.log('Server Error:', error);
    sendServerError({ res, error });
  }
};


// Delete role
const deleteRolesAndPermission = async (req, res) => {
  try {
    const deletedRole = await Rolesandpermission.findByIdAndDelete(req.body.id);
    sendOkResponse({ res, payload: deletedRole });
  } catch (error) {
    sendServerError({ res, error });
  }
};

module.exports = {
  saveRolesAndPermission,
  findAllRolesAndPermission,
  findRolesandpermissionById,
  updateRolesAndPermission,
  deleteRolesAndPermission
};
