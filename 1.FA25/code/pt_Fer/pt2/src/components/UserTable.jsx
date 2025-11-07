import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const UserTable = ({ users = [], loading, onView, onToggleStatus }) => {
  return (
    <div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avartar</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center">Loading...</td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">No users found</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td><img src={u.avatar} alt={u.username} style={{ width: '40px', height: '40px', borderRadius: '50%' }} /></td>
                <td>{u.username}</td>
                <td>{u.fullName}</td>
                <td>{u.role}</td>
                <td>
                  <Badge bg={u.status === 'active' ? 'success' : 'secondary'}>
                    {u.status}
                  </Badge>
                </td>
                <td>
                  <Button size="sm" variant="info" className="me-2" onClick={() => onView(u)}>
                    View Details
                  </Button>
                  {u.status === 'blocked' ? (
                    <Button size="sm" variant="success" onClick={() => onToggleStatus(u)}>
                      Unban
                    </Button>
                  ) : (
                    <Button size="sm" variant="danger" onClick={() => onToggleStatus(u)}>
                      Ban Account
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
