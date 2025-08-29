import { Button, Card, Form, Input, message } from "antd";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await register(values.name, values.email, values.password);
      message.success("Register success");
      navigate("/");
    } catch (err) {
      message.error(String(err));
    }
  };

  return (
    <Card title="Register" style={{ maxWidth: 480, margin: "40px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Your name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Create account
        </Button>
      </Form>
      <div style={{ marginTop: 12, textAlign: "center" }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </div>
    </Card>
  );
};

export default Register;
