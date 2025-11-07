import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Table, Badge } from 'react-bootstrap';
import * as api from '../services/api';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import ConfirmModal from '../components/ConfirmModal';
import NavigationHeader from '../components/NavigationHeader';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [actionTarget, setActionTarget] = useState(null);
  const [showActionConfirm, setShowActionConfirm] = useState(false);
  const [filters, setFilters] = useState({ q: '', role: 'all', status: 'all', sortBy: 'id', sortDir: 'asc' });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleToggleStatusClick = (user) => {
    setActionTarget(user);
    setShowActionConfirm(true);
  };

  const handleConfirmToggle = async () => {
    if (!actionTarget) return;
    const newStatus = actionTarget.status === 'blocked' ? 'active' : 'blocked';
    try {
      const updated = { ...actionTarget, status: newStatus };
      await api.updateUser(actionTarget.id, updated);
      // Update local list
      setUsers((prev) => prev.map((u) => (u.id === actionTarget.id ? updated : u)));
    } catch (err) {
      console.error('Failed to update user status', err);
    } finally {
      setShowActionConfirm(false);
      setActionTarget(null);
    }
  };

  const applyFilters = () => {
    const { q, role, status, sortBy, sortDir } = filters;
    let list = [...users];

    if (q) {
      const low = q.toLowerCase();
      list = list.filter(
        (u) =>
          (u.username && u.username.toLowerCase().includes(low)) ||
          (u.fullName && u.fullName.toLowerCase().includes(low)) ||
          (u.id && String(u.id).includes(low))
      );
    }

    if (role && role !== 'all') list = list.filter((u) => u.role === role);
    if (status && status !== 'all') list = list.filter((u) => u.status === status);

    list.sort((a, b) => {
      const A = (a[sortBy] || '').toString().toLowerCase();
      const B = (b[sortBy] || '').toString().toLowerCase();
      if (A < B) return sortDir === 'asc' ? -1 : 1;
      if (A > B) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  };

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">User Management</h5>
            </Card.Header>
            <Card.Body>
              <UserFilter filters={filters} setFilters={setFilters} />
              <UserTable
                users={applyFilters()}
                loading={loading}
                onView={handleView}
                onToggleStatus={handleToggleStatusClick}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <Table borderless>
              <tbody>
                <tr>
                  <td className="fw-bold">ID</td>
                  <td>{selectedUser.id}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Avatar</td>
                  <td>
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.username}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">Full Name</td>
                  <td>{selectedUser.fullName}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Role</td>
                  <td>{selectedUser.role}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Status</td>
                  <td>
                    <Badge bg={selectedUser.status === 'active' ? 'success' : 'secondary'}>
                      {selectedUser.status}
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Action confirm (ban / unban) */}
      <ConfirmModal
        show={showActionConfirm}
        title={actionTarget?.status === 'blocked' ? 'Xác nhận mở khóa tài khoản' : 'Xác nhận khóa tài khoản'}
        message={
          actionTarget?.status === 'blocked'
            ? `Bạn có muốn mở khóa tài khoản ${actionTarget?.username || ''}?`
            : `Bạn có muốn khóa tài khoản ${actionTarget?.username || ''}?`
        }
        onConfirm={handleConfirmToggle}
        onHide={() => setShowActionConfirm(false)}
        confirmText={actionTarget?.status === 'blocked' ? 'Mở khóa' : 'Khóa'}
        cancelText="Hủy"
        confirmVariant={actionTarget?.status === 'blocked' ? 'success' : 'danger'}
      />
      </Container>
    </>
  );
};

export default UserList;
