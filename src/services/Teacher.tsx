import axios from "axios";
import { ApiResponse } from "../types/Response/ApiResponse";
import { TeacherDto } from "../types/Teacher";

//---------------------------------------------------------------- GET TEACHERS
export const getTeacher = async (): Promise<TeacherDto[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_API_URL}/Teacher`
    );
    if (response.data && response.data.data) {
      return response.data.data as TeacherDto[];
    }
  } catch (error) {
    console.error("Error fetching teachers:", error);
  }

  return [
    {
      IdTeacher: 1,
      FirstName: "Juan Antonio",
      Position: "Ingeniero en informatica y sistemas",
      Image:
        "https://s3.abcstatics.com/media/summum/2021/10/01/maxi_iglesias-kU2E--1248x698@abc.jpeg",
      LastName: "Pérez",
      Gender: true,
      Phone: "123456789",
      Description:
        "Profesor Ordinario en la categoría de Principal en la Universidad Nacional Micaela Batidas de Apurímac - Perú. Ingeniero Informático y de Sistemas, con Magister en Ciencias mención Computación en la Universidad de Chile, y doctorado en Ciencias de la Computación UNAPerú, pasantía en el Departamento de Diseño Industrial en la Universidad de Tecnología de Eindhoven - Holanda. Area de investigación: de Ingeniería de software, informática educativa, juegos educativos, computación movil y sistemas colaborativos.",
      Mail: "juan.perez@example.com",
      Facebook: "https://www.facebook.com/unamba.apurimac",
      Linkedin: "https://www.linkedin.com/feed/",
      RegistrationCode: "001232",
      BirthDate: "1980-05-15",
      WorkExperiences: [
        {
          Id: 1,
          Institution: "Colegio Nacional",
          Job: "Profesor de Matemáticas",
          JobDescription: "Impartió clases a nivel secundario.",
          JobIDI: "MAT101",
          StartDate: "2010-01-01",
          EndDate: "2015-12-31",
        },
        {
          Id: 2,
          Institution: "Colegio Nacional",
          Job: "Profesor de Matemáticas",
          JobDescription: "Impartió clases a nivel secundario.",
          JobIDI: "MAT101",
          StartDate: "2010-01-01",
          EndDate: "2015-12-31",
        },
        {
          Id: 3,
          Institution: "Colegio Nacional",
          Job: "Profesor de Matemáticas",
          JobDescription: "Impartió clases a nivel secundario.",
          JobIDI: "MAT101",
          StartDate: "2010-01-01",
          EndDate: "2015-12-31",
        },
      ],
      TeachingExperiences: [
        {
          Id: 1,
          Institution: "Universidad Nacional",
          InstitutionType: "Universidad",
          TeacherType: "Tiempo Completo",
          JobDescription: "Docente investigador.",
          StartDate: "2016-01-01",
          EndDate: "2020-12-31",
        },
        {
          Id: 2,
          Institution: "Universidad Nacional",
          InstitutionType: "Universidad",
          TeacherType: "Tiempo Completo",
          JobDescription: "Docente investigador.",
          StartDate: "2016-01-01",
          EndDate: "2020-12-31",
        },
      ],
      ThesisAdvisingExperiences: [
        {
          Id: 1,
          University: "Universidad Nacional",
          Thesis: "Análisis de sistemas algebraicos",
          ThesisStudent: "Ana López",
          Repository: "https://tesis.un.edu.pe/123",
          ThesisAcceptanceDate: "2019-06-15",
        },
        {
          Id: 2,
          University: "Universidad Nacional",
          Thesis: "Análisis de sistemas algebraicos",
          ThesisStudent: "Ana López",
          Repository: "https://tesis.un.edu.pe/123",
          ThesisAcceptanceDate: "2019-06-15",
        },
      ],
    },
    {
      IdTeacher: 2,
      FirstName: "María",
      LastName: "López",
      Gender: false,
      Position: "Ingeniero en informatica y sistemas",
      Image:
        "https://weremote.net/wp-content/uploads/2022/08/mujer-sonriente-apunta-arriba.jpg",
      Phone: "987654321",
      Description:
        "Profesor Ordinario en la categoría de Principal en la Universidad Nacional Micaela Batidas de Apurímac - Perú. Ingeniero Informático y de Sistemas, con Magister en Ciencias mención Computación en la Universidad de Chile, y doctorado en Ciencias de la Computación UNAPerú, pasantía en el Departamento de Diseño Industrial en la Universidad de Tecnología de Eindhoven - Holanda. Area de investigación: de Ingeniería de software, informática educativa, juegos educativos, computación movil y sistemas colaborativos.",
      Mail: "maria.lopez@example.com",
      Facebook: "https://www.facebook.com/unamba.apurimac",
      Linkedin: "https://www.linkedin.com/feed/",
      RegistrationCode: "001232",
      BirthDate: "1985-10-20",
      WorkExperiences: [
        {
          Id: 2,
          Institution: "Instituto de Ciencias Sociales",
          Job: "Investigadora",
          JobDescription: "Estudios en sociología aplicada.",
          JobIDI: "SOC301",
          StartDate: "2012-03-01",
          EndDate: "2018-05-31",
        },
      ],
      TeachingExperiences: [
        {
          Id: 2,
          Institution: "Universidad de Ciencias Sociales",
          InstitutionType: "Universidad",
          TeacherType: "Catedrática",
          JobDescription: "Impartió cursos de sociología.",
          StartDate: "2019-01-01",
          EndDate: "",
        },
        {
          Id: 3,
          Institution: "Universidad de Ciencias Sociales",
          InstitutionType: "Universidad",
          TeacherType: "Catedrática",
          JobDescription: "Impartió cursos de sociología.",
          StartDate: "2019-01-01",
          EndDate: "",
        },
        {
          Id: 4,
          Institution: "Universidad de Ciencias Sociales",
          InstitutionType: "Universidad",
          TeacherType: "Catedrática",
          JobDescription: "Impartió cursos de sociología.",
          StartDate: "2019-01-01",
          EndDate: "",
        },
      ],
      ThesisAdvisingExperiences: [
        {
          Id: 2,
          University: "Universidad de Ciencias Sociales",
          Thesis: "Impacto de las redes sociales en la sociedad moderna",
          ThesisStudent: "Carlos García",
          Repository: "https://tesis.ucs.edu.pe/456",
          ThesisAcceptanceDate: "2021-09-10",
        },
        {
          Id: 4,
          University: "Universidad de Ciencias Sociales",
          Thesis: "Impacto de las redes sociales en la sociedad moderna",
          ThesisStudent: "Carlos García",
          Repository: "https://tesis.ucs.edu.pe/456",
          ThesisAcceptanceDate: "2021-09-10",
        },
      ],
    },
    {
      IdTeacher: 3,
      FirstName: "Luis",
      LastName: "Ramírez",
      Gender: true,
      Position: "Ingeniero en informatica y sistemas",
      Image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWjbtBrYGjPRWcD0OBjr5JKCDFEL2eDvcx_RIHgsjjty8TVdSL6w1R3k6KWfJS9Qrb2h4",
      Phone: "555123456",
      Description:
        "Profesor Ordinario en la categoría de Principal en la Universidad Nacional Micaela Batidas de Apurímac - Perú. Ingeniero Informático y de Sistemas, con Magister en Ciencias mención Computación en la Universidad de Chile, y doctorado en Ciencias de la Computación UNAPerú, pasantía en el Departamento de Diseño Industrial en la Universidad de Tecnología de Eindhoven - Holanda. Area de investigación: de Ingeniería de software, informática educativa, juegos educativos, computación movil y sistemas colaborativos.",
      Mail: "luis.ramirez@example.com",
      Facebook: "https://www.facebook.com/unamba.apurimac",
      Linkedin: "https://www.linkedin.com/feed/",
      RegistrationCode: "001232",
      BirthDate: "1978-08-25",
      WorkExperiences: [
        {
          Id: 3,
          Institution: "Empresa Constructora XYZ",
          Job: "Ingeniero Civil",
          JobDescription: "Diseño y supervisión de obras.",
          JobIDI: "CIV201",
          StartDate: "2000-06-01",
          EndDate: "2010-08-31",
        },
      ],
      TeachingExperiences: [
        {
          Id: 3,
          Institution: "Universidad de Ingeniería",
          InstitutionType: "Universidad",
          TeacherType: "Parcial",
          JobDescription: "Docente de estructuras.",
          StartDate: "2011-01-01",
          EndDate: "",
        },
      ],
      ThesisAdvisingExperiences: [
        {
          Id: 3,
          University: "Universidad de Ingeniería",
          Thesis: "Análisis estructural de puentes",
          ThesisStudent: "Miguel Fernández",
          Repository: "https://tesis.ui.edu.pe/789",
          ThesisAcceptanceDate: "2020-02-20",
        },
      ],
    },
    {
      IdTeacher: 4,
      FirstName: "Carmen",
      LastName: "Hernández",
      Gender: false,
      Position: "Ingeniero en informatica y sistemas",
      Image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2kEuFLG1g5SfYCKqyqDKl9GDdMBbw2R7dsrijjjH7Ak_Nye3u9qd5z8DeXZWB70U0dA",
      Phone: "444789123",
      Description:
        "Profesor Ordinario en la categoría de Principal en la Universidad Nacional Micaela Batidas de Apurímac - Perú. Ingeniero Informático y de Sistemas, con Magister en Ciencias mención Computación en la Universidad de Chile, y doctorado en Ciencias de la Computación UNAPerú, pasantía en el Departamento de Diseño Industrial en la Universidad de Tecnología de Eindhoven - Holanda. Area de investigación: de Ingeniería de software, informática educativa, juegos educativos, computación movil y sistemas colaborativos.",
      Mail: "carmen.hernandez@example.com",
      Facebook: "https://www.facebook.com/unamba.apurimac",
      Linkedin: "https://www.linkedin.com/feed/",
      RegistrationCode: "001232",
      BirthDate: "1990-07-12",
      WorkExperiences: [
        {
          Id: 4,
          Institution: "Instituto de Investigación Ambiental",
          Job: "Investigadora",
          JobDescription: "Estudios en biodiversidad.",
          JobIDI: "ENV102",
          StartDate: "2013-01-01",
          EndDate: "2018-12-31",
        },
      ],
      TeachingExperiences: [
        {
          Id: 4,
          Institution: "Universidad de Ciencias Naturales",
          InstitutionType: "Universidad",
          TeacherType: "Tiempo Completo",
          JobDescription: "Impartió cursos de ecología.",
          StartDate: "2019-01-01",
          EndDate: "",
        },
      ],
      ThesisAdvisingExperiences: [
        {
          Id: 4,
          University: "Universidad de Ciencias Naturales",
          Thesis: "Conservación de especies en peligro",
          ThesisStudent: "Lucía Torres",
          Repository: "https://tesis.ucn.edu.pe/1234",
          ThesisAcceptanceDate: "2022-07-15",
        },
      ],
    },
    {
      IdTeacher: 5,
      FirstName: "Pedro",
      LastName: "Gómez",
      Position: "Ingeniero en informatica y sistemas",
      Gender: true,
      Image:
        "https://static.vecteezy.com/system/resources/thumbnails/007/421/470/small/handsome-cheerful-bearded-man-smiles-gladfully-dressed-in-casual-white-t-shirt-being-in-good-mood-poses-against-blue-background-with-copy-space-glad-european-guy-with-stubble-stands-indoor-free-photo.jpg",
      Phone: "321654987",
      Description:
        "Profesor Ordinario en la categoría de Principal en la Universidad Nacional Micaela Batidas de Apurímac - Perú. Ingeniero Informático y de Sistemas, con Magister en Ciencias mención Computación en la Universidad de Chile, y doctorado en Ciencias de la Computación UNAPerú, pasantía en el Departamento de Diseño Industrial en la Universidad de Tecnología de Eindhoven - Holanda. Area de investigación: de Ingeniería de software, informática educativa, juegos educativos, computación movil y sistemas colaborativos.",
      Mail: "pedro.gomez@example.com",
      Facebook: "https://www.facebook.com/unamba.apurimac",
      Linkedin: "https://www.linkedin.com/feed/",
      RegistrationCode: "001232",
      BirthDate: "1987-09-10",
      WorkExperiences: [
        {
          Id: 5,
          Institution: "Centro de Desarrollo Tecnológico",
          Job: "Analista de Sistemas",
          JobDescription: "Diseño y mantenimiento de sistemas informáticos.",
          JobIDI: "IT501",
          StartDate: "2008-01-01",
          EndDate: "2014-12-31",
        },
      ],
      TeachingExperiences: [
        {
          Id: 5,
          Institution: "Instituto Tecnológico Nacional",
          InstitutionType: "Instituto",
          TeacherType: "Catedrático",
          JobDescription: "Docente de programación avanzada.",
          StartDate: "2015-01-01",
          EndDate: "",
        },
      ],
      ThesisAdvisingExperiences: [
        {
          Id: 5,
          University: "Instituto Tecnológico Nacional",
          Thesis: "Desarrollo de aplicaciones móviles",
          ThesisStudent: "Sara Martínez",
          Repository: "https://tesis.itn.edu.pe/5678",
          ThesisAcceptanceDate: "2021-04-10",
        },
      ],
    },
    {
      IdTeacher: 6,
      FirstName: "Laura",
      LastName: "Martínez",
      Gender: false,
      Position: "Ingeniero en informatica y sistemas",
      Image:
        "https://static01.nyt.com/images/2017/05/07/arts/07GAL-GADOTweb/07GAL-GADOTweb-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      Phone: "789654123",
      Description:
        "Profesor Ordinario en la categoría de Principal en la Universidad Nacional Micaela Batidas de Apurímac - Perú. Ingeniero Informático y de Sistemas, con Magister en Ciencias mención Computación en la Universidad de Chile, y doctorado en Ciencias de la Computación UNAPerú, pasantía en el Departamento de Diseño Industrial en la Universidad de Tecnología de Eindhoven - Holanda. Area de investigación: de Ingeniería de software, informática educativa, juegos educativos, computación movil y sistemas colaborativos.",
      Mail: "laura.martinez@example.com",
      Facebook: "https://www.facebook.com/unamba.apurimac",
      Linkedin: "https://www.linkedin.com/feed/",
      RegistrationCode: "001232",
      BirthDate: "1992-11-03",
      WorkExperiences: [
        {
          Id: 6,
          Institution: "Escuela Primaria Los Pinos",
          Job: "Maestra",
          JobDescription: "Desarrollo de estrategias pedagógicas innovadoras.",
          JobIDI: "EDU202",
          StartDate: "2012-01-01",
          EndDate: "2018-07-31",
        },
        {
          Id: 7,
          Institution: "Escuela Primaria Los Pinos",
          Job: "Maestra",
          JobDescription: "Desarrollo de estrategias pedagógicas innovadoras.",
          JobIDI: "EDU202",
          StartDate: "2012-01-01",
          EndDate: "2018-07-31",
        },
      ],
      TeachingExperiences: [
        {
          Id: 6,
          Institution: "Universidad Pedagógica",
          InstitutionType: "Universidad",
          TeacherType: "Tiempo Completo",
          JobDescription: "Docente formadora de futuros maestros.",
          StartDate: "2019-01-01",
          EndDate: "",
        },
        {
          Id: 7,
          Institution: "Universidad Pedagógica",
          InstitutionType: "Universidad",
          TeacherType: "Tiempo Completo",
          JobDescription: "Docente formadora de futuros maestros.",
          StartDate: "2019-01-01",
          EndDate: "",
        },
      ],
      ThesisAdvisingExperiences: [
        {
          Id: 6,
          University: "Universidad Pedagógica",
          Thesis: "Estrategias pedagógicas para niños con TDAH",
          ThesisStudent: "Roberto Díaz",
          Repository: "https://tesis.up.edu.pe/91011",
          ThesisAcceptanceDate: "2022-03-20",
        },
      ],
    },
    {
      IdTeacher: 7,
      FirstName: "Sofía",
      LastName: "Morales",
      Gender: false,
      Position: "Ingeniero en informatica y sistemas",
      Image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNk2kfet19CbINuMDAgzk1Q5i6jtsi6rPEfg&s",
      Phone: "456123789",
      Description:
        "Profesor Ordinario en la categoría de Principal en la Universidad Nacional Micaela Batidas de Apurímac - Perú. Ingeniero Informático y de Sistemas, con Magister en Ciencias mención Computación en la Universidad de Chile, y doctorado en Ciencias de la Computación UNAPerú, pasantía en el Departamento de Diseño Industrial en la Universidad de Tecnología de Eindhoven - Holanda. Area de investigación: de Ingeniería de software, informática educativa, juegos educativos, computación movil y sistemas colaborativos.",
      Mail: "sofia.morales@example.com",
      Facebook: "https://www.facebook.com/unamba.apurimac",
      Linkedin: "https://www.linkedin.com/feed/",
      RegistrationCode: "001232",
      BirthDate: "1983-06-18",
      WorkExperiences: [
        {
          Id: 7,
          Institution: "Instituto de Letras",
          Job: "Editora",
          JobDescription: "Edición de textos académicos.",
          JobIDI: "LIT303",
          StartDate: "2010-05-01",
          EndDate: "2015-09-30",
        },
      ],
      TeachingExperiences: [
        {
          Id: 7,
          Institution: "Universidad de Literatura",
          InstitutionType: "Universidad",
          TeacherType: "Catedrática",
          JobDescription: "Docente de literatura clásica.",
          StartDate: "2016-01-01",
          EndDate: "",
        },
      ],
      ThesisAdvisingExperiences: [
        {
          Id: 7,
          University: "Universidad de Literatura",
          Thesis: "Análisis de la obra de Gabriel García Márquez",
          ThesisStudent: "Manuel Ortega",
          Repository: "https://tesis.ul.edu.pe/78910",
          ThesisAcceptanceDate: "2020-08-15",
        },
      ],
    },
  ];
};
