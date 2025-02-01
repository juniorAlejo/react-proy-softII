import { FC } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { User } from "lucide-react";

type Project = {
  date: string;
  title: string;
  teacher: string;
};

const projects: Project[] = [
  {
    date: "12/12/12",
    title: "La inteligencia artificial en la educación superior",
    teacher: "Doc. Nombre Docente",
  },
  {
    date: "12/12/12",
    title:
      "MeViSis simulator: an educational resource for teaching earthquake-resistant structures",
    teacher: "Doc. Nombre Docente",
  },
  {
    date: "12/12/12",
    title:
      "Telemonitoring and decision support system for covid-19 patients in the hospitalization area",
    teacher: "Doc. Nombre Docente",
  },
  {
    date: "12/12/12",
    title: "La inteligencia artificial en la educación superior",
    teacher: "Doc. Nombre Docente",
  },
  {
    date: "12/12/12",
    title:
      "MeViSis simulator: an educational resource for teaching earthquake-resistant structures",
    teacher: "Doc. Nombre Docente",
  },
];

const Projects: FC = () => {
  const truncateTitle = (title: string) => {
    return title.length > 60 ? title.slice(0, 60) + "..." : title;
  };

  return (
    <>
      <Breadcrumb pageName="Proyectos" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative text-white rounded-xl shadow-lg p-4 pr-10 overflow-hidden ${
              index === 2 ? "bg-[#001e17]" : "bg-primary"
            }`}
          >
            <div className="mb-4">
              <span className="bg-white text-sm text-black px-2 py-1 rounded-full">
                {project.date}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">
                {truncateTitle(project.title)}
              </h2>
              <p className="text-sm flex items-center gap-2">
                <User size={17} />
                {project.teacher}
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
    </>
  );
};

export default Projects;
