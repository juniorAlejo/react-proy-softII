import axios from "axios";
import { ApiResponse } from "../types/Response/ApiResponse";
import { ScientificArticleDto } from "../types/ScientificArticle";

//---------------------------------------------------------------- GET ARTICLES
export const getScientificArticle = async (): Promise<
  ScientificArticleDto[]
> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_API_URL}/ScientificArticle`
    );
    if (response.data && response.data.data) {
      return response.data.data as ScientificArticleDto[];
    }
  } catch (error) {
    console.error("Error fetching teachers:", error);
  }

  return [
    {
      IdScientificArticle: 2,
      Name: "Impacto del cambio climático en la biodiversidad amazónica",
      Description:
        "El cambio climático representa una amenaza significativa para la biodiversidad, especialmente en ecosistemas sensibles como la Amazonía.",
      Summary:
        "Este estudio analiza las repercusiones del cambio climático en la biodiversidad de la Amazonía, enfocándose en la pérdida de especies endémicas y cambios en los patrones migratorios. Se utilizaron métodos cuantitativos para evaluar datos de temperatura y precipitación en las últimas tres décadas, y su correlación con la disminución de especies clave. Los resultados muestran un incremento del 20% en la tasa de extinción de especies y una alteración en los ciclos reproductivos de flora y fauna. Se concluye que es fundamental implementar estrategias de conservación basadas en la restauración de hábitats y mitigación de emisiones de carbono.",
      Date: "05/01/2025",
      Doi: "https://hdl.handle.net/20.500.12724/21801",
      Authors: "Pérez Cáceres, María Fernanda",
      Pdf: "https://repositorio.unamba.edu.pe/bitstream/handle/UNAMBA/1535/T_1535.pdf?sequence=1&isAllowed=y",
      Editor:
        "Facultad de Ciencias Ambientales. Universidad Nacional Mayor de San Marcos",
    },
    {
      IdScientificArticle: 3,
      Name: "La inteligencia artificial en la educación superior",
      Description:
        "La implementación de la inteligencia artificial (IA) en la educación superior abre nuevas posibilidades para personalizar el aprendizaje y mejorar la gestión académica.",
      Summary:
        "El presente artículo explora el impacto de la IA en la educación superior, incluyendo herramientas de aprendizaje adaptativo y asistentes virtuales. Utilizando un enfoque cualitativo, se recopilaron opiniones de docentes y estudiantes de tres universidades latinoamericanas. Los resultados indican que el 70% de los encuestados considera que la IA mejora la eficiencia en el aprendizaje, aunque destacan desafíos relacionados con la privacidad y la desigualdad tecnológica. Como recomendación, se sugiere capacitar al personal académico en el uso de tecnologías basadas en IA.",
      Date: "15/02/2025",
      Doi: "https://hdl.handle.net/20.500.12724/21802",
      Authors: "González Paredes, Luis Antonio",
      Pdf: "https://repositorio.unamba.edu.pe/bitstream/handle/UNAMBA/1536/T_1536.pdf?sequence=1&isAllowed=y",
      Editor:
        "Escuela de Innovación Tecnológica. Pontificia Universidad Católica del Perú",
    },
    {
      IdScientificArticle: 4,
      Name: "Eficiencia energética en edificios inteligentes",
      Description:
        "Los edificios inteligentes están diseñados para optimizar el consumo energético mediante el uso de tecnologías avanzadas.",
      Summary:
        "Este trabajo evalúa la implementación de sistemas de eficiencia energética en edificios inteligentes en zonas urbanas de Perú. Se emplearon métodos experimentales para analizar el ahorro energético en comparación con edificios convencionales. Los resultados reflejan un ahorro promedio del 30% en consumo energético y una reducción significativa en las emisiones de carbono. Se concluye que la adopción de estas tecnologías contribuirá al cumplimiento de los Objetivos de Desarrollo Sostenible relacionados con energía limpia.",
      Date: "28/03/2025",
      Doi: "https://hdl.handle.net/20.500.12724/21803",
      Authors: "López Vega, Ricardo Martín",
      Pdf: "https://repositorio.unamba.edu.pe/bitstream/handle/UNAMBA/1537/T_1537.pdf?sequence=1&isAllowed=y",
      Editor: "Facultad de Ingeniería. Universidad de Lima",
    },
    {
      IdScientificArticle: 5,
      Name: "Estrategias de marketing digital para pequeñas empresas",
      Description:
        "El marketing digital se ha convertido en una herramienta esencial para la sostenibilidad de las pequeñas empresas en el mercado actual.",
      Summary:
        "El artículo analiza el impacto de las estrategias de marketing digital en pequeñas empresas del sector retail. A través de un enfoque mixto, se encuestaron a 50 empresarios y se realizó un análisis de métricas en redes sociales. Los hallazgos indican que las campañas en plataformas como Facebook e Instagram generan un retorno de inversión del 35% más alto que los métodos tradicionales. Se recomienda la implementación de estrategias de contenido visual y campañas segmentadas para maximizar resultados.",
      Date: "10/04/2025",
      Doi: "https://hdl.handle.net/20.500.12724/21804",
      Authors: "Ramírez Soto, Daniela",
      Pdf: "https://repositorio.unamba.edu.pe/bitstream/handle/UNAMBA/1538/T_1538.pdf?sequence=1&isAllowed=y",
      Editor: "Escuela de Administración. Universidad Nacional de Ingeniería",
    },
    {
      IdScientificArticle: 6,
      Name: "El uso de drones en la agricultura de precisión",
      Description:
        "Los drones se han convertido en herramientas indispensables para mejorar la eficiencia en la agricultura mediante técnicas de precisión.",
      Summary:
        "Este estudio evalúa el uso de drones en cultivos de papa en la región andina de Perú. Se recopilaron datos sobre el monitoreo de plagas y la aplicación de fertilizantes mediante drones, comparándolos con métodos tradicionales. Los resultados revelan una mejora del 25% en la productividad y una reducción del 15% en costos operativos. La investigación concluye que los drones representan una solución innovadora para enfrentar los desafíos agrícolas en regiones de difícil acceso.",
      Date: "20/05/2025",
      Doi: "https://hdl.handle.net/20.500.12724/21805",
      Authors: "Torres Vargas, Juan Pablo",
      Pdf: "https://repositorio.unamba.edu.pe/bitstream/handle/UNAMBA/1539/T_1539.pdf?sequence=1&isAllowed=y",
      Editor:
        "Facultad de Ciencias Agrarias. Universidad Nacional Agraria La Molina",
    },
  ];
};
