const mongoose = require('mongoose');

const rolesAndPermissionSchema = new mongoose.Schema({
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  permissions: [
    {
      permission: { type: mongoose.Schema.Types.ObjectId, ref: 'permission', required: true },
      canAdd: { type: Number, default: 0 },
      canView: { type: Number, default: 0 },
      canEdit: { type: Number, default: 0 },
      canDelete: { type: Number, default: 0 }, 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('RolesAndPermission', rolesAndPermissionSchema);





