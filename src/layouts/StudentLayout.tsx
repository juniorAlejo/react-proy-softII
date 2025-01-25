import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/HeaderStudent/Header";

function StudentLayout() {
  return (
    <div className="overflow-hidden relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default StudentLayout;
