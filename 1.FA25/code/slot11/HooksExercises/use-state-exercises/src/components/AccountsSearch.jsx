import React, { useMemo, useState } from "react";
import { Card, Row, Col, Container, Form } from "react-bootstrap";

const accounts = [
  {
    id: 1,
    username: "alice",
    password: "alice123",
    avatar: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRmmy9zN-EAn_r0jOm84edG1XOYmYTtIMnONj-eGqHKiZATXJxGK4j0fgD9LNbW5FnDTEVv-C8ch2Stm6BK16yhGNmVgewWuDNDgMNv-mD2mw",
  },
  {
    id: 2,
    username: "bob",
    password: "bob123",
    avatar: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSujg0319SoOKNO-tYUlnlmi65LluKFrgoVhuyYrwb7YrOrFehbqnOvykbpmggEl76KYVlzRCqDPfgvoOyfi3B7LTf7RIpBqiLQtEpmjZhv_Yy-EoWVSUF7GhEX9OfJoSVmIi9tkfdZ8gY",
  },
  {
    id: 3,
    username: "charlie",
    password: "charlie123",
    avatar: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRmmy9zN-EAn_r0jOm84edG1XOYmYTtIMnONj-eGqHKiZATXJxGK4j0fgD9LNbW5FnDTEVv-C8ch2Stm6BK16yhGNmVgewWuDNDgMNv-mD2mw",
  },
  {
    id: 4,
    username: "david",
    password: "david123",
    avatar: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSujg0319SoOKNO-tYUlnlmi65LluKFrgoVhuyYrwb7YrOrFehbqnOvykbpmggEl76KYVlzRCqDPfgvoOyfi3B7LTf7RIpBqiLQtEpmjZhv_Yy-EoWVSUF7GhEX9OfJoSVmIi9tkfdZ8gY",
  },
];

function AccountsSearch() {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return accounts;
    return accounts.filter((a) => a.username.toLowerCase().includes(k));
  }, [keyword]);

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Danh sách tài khoản</h3>
      <Form.Control
        placeholder="Tìm theo username..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mb-3"
      />
      {filtered.length === 0 ? (
        <div className="text-center text-muted">Không tìm thấy kết quả</div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {filtered.map((acc) => (
            <Col key={acc.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={acc.avatar} alt={acc.username} />
                <Card.Body>
                  <Card.Title>@{acc.username}</Card.Title>
                  <Card.Text className="text-muted">ID: {acc.id}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default AccountsSearch;
