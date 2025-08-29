import { Card, Button, message } from "antd";
import axiosClient from "../util/axiosClient";
import { useAuth } from "../components/context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  const callHomeAPI = async () => {
    try {
      const { data } = await axiosClient.get("/home");
      message.success(`API ok: ${data.message}`);
    } catch (e) {
      message.error(e?.response?.data?.error || e.message);
    }
  };

  return (
    <Card
      title="Home (Protected)"
      style={{ maxWidth: 720, margin: "40px auto" }}
    >
      <p>
        Xin chào, <b>{user?.name}</b> ({user?.email})
      </p>
      <Button onClick={callHomeAPI}>Gọi API /home</Button>
      <Button danger style={{ marginLeft: 8 }} onClick={logout}>
        Logout
      </Button>
    </Card>
  );
};

export default Home;
