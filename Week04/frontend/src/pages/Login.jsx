import { Button, Card, Form, Input, message } from "antd";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);
      message.success("Login success");
      navigate("/");
    } catch (err) {
      message.error(String(err));
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 420, margin: "40px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
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
          Sign in
        </Button>
      </Form>
      <div style={{ marginTop: 12, textAlign: "center" }}>
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </div>
    </Card>
  );
};

export default Login;
