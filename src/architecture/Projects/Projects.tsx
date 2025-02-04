import { FC, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { User } from "lucide-react";
import { ProjectGetAll } from "../../types/Teacher/Project";
import { getResearchProjectByTeacherId } from "../../services/Teacher/ResearchProject";
import Loader from "../../common/Loader";
import { useNavigate } from "react-router-dom";

const Projects: FC = () => {
  const userData = sessionStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const [projects, setProjects] = useState<ProjectGetAll[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  const navigate = useNavigate();

  const truncateTitle = (title: string) => {
    return title.length > 60 ? title.slice(0, 60) + "..." : title;
  };

  //---------------------------------------------------------------- GET ALL
  const fetchProjectTeacher = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      const fetchedTeacher = await getResearchProjectByTeacherId(user.id);
      console.log(fetchedTeacher);
      setProjects(fetchedTeacher || []);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectTeacher();
  }, [user?.id]);

  const handleClick = (projectId: any) => {
    navigate(`/teacher/project-detail/${projectId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Proyectos" />

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          No hay proyectos disponibles
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative text-white rounded-xl shadow-lg p-4 pr-10 overflow-hidden cursor-pointer ${
                index === 2 ? "bg-[#001e17]" : "bg-primary"
              }`}
              onClick={() => handleClick(project.id)}
            >
              <div className="mb-4">
                <span className="bg-white text-sm text-black px-2 py-1 rounded-full">
                  {new Date(project.date).toLocaleDateString("es-ES")}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2">
                  {truncateTitle(project.name)}
                </h2>
                <p className="text-sm flex items-center gap-2">
                  <User size={17} />
                  {project.authors}
                </p>
              </div>
              <svg
                className="absolute top-0 right-0 w-45 h-56 opacity-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 200"
                fill="currentColor"
              >
                <circle cx="100" cy="10" r="4" />
                <circle cx="120" cy="10" r="4" />
                <circle cx="110" cy="40" r="4" />
                <circle cx="130" cy="40" r="4" />
                <circle cx="100" cy="70" r="4" />
                <circle cx="120" cy="70" r="4" />
                <circle cx="110" cy="100" r="4" />
                <circle cx="130" cy="100" r="4" />
                <circle cx="100" cy="130" r="4" />
                <circle cx="120" cy="130" r="4" />
                <circle cx="110" cy="160" r="4" />
                <circle cx="130" cy="160" r="4" />
                <circle cx="100" cy="190" r="4" />
                <circle cx="120" cy="190" r="4" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Projects;
