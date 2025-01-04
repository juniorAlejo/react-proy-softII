import axios from "axios";
import { ApiResponse } from "../types/Response/ApiResponse";
import { ResearchProjectDto } from "../types/ResearchProject";

//---------------------------------------------------------------- GET RESEARCH PROJECT
// export const getResearchProject = async (): Promise<ResearchProjectDto[]> => {
//   try {
//     const response = await axios.get<ApiResponse>(
//       `${import.meta.env.VITE_API_URL}/ResearchProject`
//     );
//     if (response.data.success) {
//       return response.data.data;
//     } else {
//       throw new Error(response.data.msg);
//     }
//   } catch (error) {
//     throw new Error("Error al obtener proyectos de investigacion");
//   }
// };
export const getResearchProject = async (): Promise<ResearchProjectDto[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_API_URL}/ScientificArticle`
    );
    if (response.data && response.data.data) {
      return response.data.data as ResearchProjectDto[];
    }
  } catch (error) {
    console.error("Error fetching teachers:", error);
  }

  return [
    {
      IdResearchProject: 2,
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
      IdResearchProject: 3,
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
  ];
};
