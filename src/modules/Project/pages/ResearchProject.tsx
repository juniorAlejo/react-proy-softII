import { useEffect, useState } from "react";
import { AiFillBook, AiFillFilePdf, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ResearchProjectDto } from "../../../types/ResearchProject";
import { getResearchProjects } from "../../../services/Student/ResearchProject";
import { formatDate } from "../../../utils/util";

export const ResearchProject = () => {
  const [project, setProject] = useState<ResearchProjectDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  const [filteredProject, setFilteredProject] = useState<ResearchProjectDto[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projects = await getResearchProjects();
        setProject(projects || []);
        setFilteredProject(projects || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProject([]);
        setFilteredProject([]);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);


  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredProject(project);
    } else {
      const filtered = project.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProject(filtered);
    }
  }, [searchText, project]);

  const handleCardClick = (project: ResearchProjectDto) => {
    navigate(`/student/research-project/${project.id}`, { state: project });
  };

  return (
    <section className="mt-[120px] sm:mt-10 max-w-[1350px] mx-auto py-16">
      <div className="container mx-auto">
        <div className="flex flex-col items-center min-h-screen p-4">
          <div className="w-full">
            <div className="w-full flex items-center space-x-3">
              <AiFillBook size={32} className="text-primary_light" />
              <h1 className="text-3xl font-bold text-primary_light">
                Proyectos de Investigación
              </h1>
            </div>

            <div className="mt-6 w-full flex items-center gap-2">
              <div className="w-full flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-primary_light">
                <AiOutlineSearch size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  className="flex-grow text-lg focus:outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <button
                className="bg-secondary_light hover:bg-primary text-white font-bold px-6 py-3 rounded-md"
                onClick={() => setSearchText("")}
              >
                Limpiar
              </button>
            </div>
          </div>

          <div className="w-full flex flex-row mt-4">
            {loading ? (
              <div className="w-3/4 text-center">Cargando proyectos...</div>
            ) : (
              <section className="w-3/4">
                {filteredProject.length > 0 ? (
                  filteredProject.map((project) => (
                    <article
                      key={project.id}
                      className="bg-white shadow-md rounded-lg p-4 mb-4"
                    >
                      <a
                        className="text-blue-600 text-lg font-bold hover:underline cursor-pointer"
                        onClick={() => handleCardClick(project)}
                      >
                        {project.name}
                      </a>
                      <p className="text-gray-400 text-sm">
                        Año {formatDate(project.date)}
                      </p>
                      <p className="text-gray-900 text-sm">
                        <p>
                          Autores:{" "}
                          <span className="text-secondary_light">
                            {project.authors}
                          </span>
                        </p>
                      </p>
                      <p className="text-gray-700 mt-2">{project.description}</p>
                      <a
                        href={project.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-auto max-w-24 flex items-center mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                      >
                        <AiFillFilePdf size={20} className="mr-2" /> PDF
                      </a>
                    </article>
                  ))
                ) : (
                  <div className="text-gray-500 text-center">
                    No se encontraron proyectos.
                  </div>
                )}
              </section>
            )}
            <aside className="w-1/4 h-[250px] p-4 rounded-lg ml-4"></aside>
          </div>
        </div>
      </div>
    </section>
  );
};
