import { Outlet } from "react-router-dom";
import { Header, Content, Footer } from "../../components";

const LayoutDefault = () => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
};

export { LayoutDefault };
