import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

export default function AdminLayout(props) {
  return (
    <Layout className="layout" {...props}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content style={{ minHeight: "calc(100vh - 133px)" }}>{props.children}</Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Patrons © 2023
      </Footer>
    </Layout>
  );
}
