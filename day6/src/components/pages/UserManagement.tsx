import { memo } from 'react';

export const UserManagement = memo(() => {
  return (
    <div className="user-management-container">
      <h2 className="user-management-title">User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
    </div>
  );
});

export default UserManagement;