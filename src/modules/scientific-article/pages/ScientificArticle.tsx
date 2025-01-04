import { useEffect, useState } from "react";
import { AiFillBook, AiFillFilePdf, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getScientificArticle } from "../../../services/ScientificArticle";
import { ScientificArticleDto } from "../../../types/ScientificArticle";

export const ScientificArticle = () => {
  const [article, setArticles] = useState<ScientificArticleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  //---------------------------------------------------------------- GET TEACHERS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const articles = await getScientificArticle();
        setArticles(articles);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    loadProducts();
  }, []);

  const handleCardClick = (article: ScientificArticleDto) => {
    navigate(`/scientific-article/${article.IdScientificArticle}`, {
      state: article,
    });
  };

  return (
    <section className="mt-[120px] sm:mt-10 max-w-[1350px] mx-auto py-16">
      <div className="container mx-auto">
        <div className="flex flex-col items-center min-h-screen p-4">
          <div className="w-full">
            <div className="w-full flex items-center space-x-3">
              <AiFillBook size={32} className="text-primary_light" />
              <h1 className="text-3xl font-bold text-primary_light">
                Artículos Científicos
              </h1>
            </div>

            <div className="mt-6 w-full flex items-center gap-2">
              <div className=" w-full flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-primary_light">
                <AiOutlineSearch size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  className="flex-grow text-lg focus:outline-none"
                />
              </div>

              <button className="bg-secondary_light hover:bg-primary text-white font-bold px-6 py-3 rounded-md">
                Buscar
              </button>
            </div>
          </div>

          <div className="w-full flex flex-row mt-4">
            {loading ? (
              <div className="w-3/4 text-center">Cargando articulos...</div>
            ) : (
              <section className="w-3/4">
                {article.map((article) => (
                  <article
                    key={article.IdScientificArticle}
                    className="bg-white shadow-md rounded-lg p-4 mb-4"
                  >
                    <a
                      className="text-blue-600 text-lg font-bold hover:underline cursor-pointer"
                      onClick={() => handleCardClick(article)}
                    >
                      {article.Name}
                    </a>
                    <p className="text-gray-400 text-sm">fecha: {article.Date}</p>
                    <p className="text-gray-900 text-sm">
                      Doi:{" "}
                      <a
                        href="#"
                        className="text-secondary_light hover:underline"
                      >
                        {article.Doi}
                      </a>
                    </p>
                    <p className="text-gray-900 text-sm">
                      <p>
                        Autores:{" "}
                        <span className="text-secondary_light">
                          {article.Authors}
                        </span>
                      </p>
                    </p>
                    <p className="text-gray-700 mt-2">{article.Description}</p>
                    <a
                      href={article.Pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-auto max-w-24 flex items-center mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                    >
                      <AiFillFilePdf size={20} className="mr-2" /> PDF
                    </a>
                  </article>
                ))}
              </section>
            )}
            <aside className="w-1/4 h-[250px] bg-[#F8F8F8] p-4 rounded-lg ml-4">
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                Listar a nivel:
              </h3>
              <ul className="space-y-2">
                {["Revistas", "Procidis", "Patentes", "Conferencia"].map(
                  (item) => (
                    <li
                      key={item}
                      className="text-gray-700 hover:text-blue-500 cursor-pointer"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
