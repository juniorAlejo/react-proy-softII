import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const handleNavigation = (path: string, title: string) => {
    document.title = title; 
    navigate(path);
  };

  return (
    <nav className="flex items-center gap-9 font-medium text-primary">
      <Link
        className={`${
          pathname === "/student" ? "text-primary font-semibold" : "text-black"
        } hover:text-primary transition`}
        to={"/student"}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation("/student","Repositorio Académico");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Inicio
      </Link>
      <Link
        className={`${
          pathname.startsWith("/student/scientific-article")
            ? "text-primary font-semibold"
            : "text-black"
        } hover:text-primary transition`}
        to="/student/scientific-article"
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(
            "/student/scientific-article",
            "Artículos Científicos"
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Artículos Científicos
      </Link>

      <Link
        className={`${
          pathname.startsWith("/student/research-project")
            ? "text-primary font-semibold"
            : "text-black"
        } hover:text-primary transition`}
        to={"/student/research-project"}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(
            "/student/research-project",
            "Proyectos de Investigación"
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Proyectos de Investigación
      </Link>
      <Link
        className={`${
          pathname === "/contact" ? "text-primary font-semibold" : "text-black"
        } hover:text-primary transition`}
        to={"/student/contact"}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(
            "/student/contact",
            "Soporte"
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Soporte
      </Link>
    </nav>
  );
};
