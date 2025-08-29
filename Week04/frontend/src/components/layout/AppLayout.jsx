import { Layout, Menu } from "antd";
import { useAuth } from "../context/AuthContext";

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div style={{ color: "#fff", fontWeight: 600, marginRight: 24 }}>
          React + AntD
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            { key: "home", label: "Home" },
            user
              ? { key: "logout", label: "Logout", onClick: logout }
              : { key: "login", label: "Login" },
          ]}
        />
      </Header>
      <Content style={{ padding: 24 }}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        Demo © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default AppLayout;
