const userModel = require('../models/user');

// Manage user roles
module.exports = {
  setRole: async function(adminId, targetUser, role) {
    if (await userModel.getRole(adminId) !== 'master') {
      return { message: 'Error: Only users with master roles can set roles.' };
    }
    await userModel.setRole(targetUser, role);
    return { message: `Role ${role} assigned to ${targetUser}` };
  },

  listRoles: async function() {
    const roles = await userModel.getAllRoles();
    return roles.map(r => `${r.user_id}: ${r.role}`).join('\n');
  }
};
