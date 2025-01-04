import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { ResearchProject } from "../modules/Project/pages/ResearchProject";
import { ScientificArticle } from "../modules/scientific-article/pages/ScientificArticle";
import { Contact } from "../modules/contact/pages/Contact";
import { ResearchProjectDetail } from "../modules/Project/pages/ResearchProjectDetail";
import { TeacherDetail } from "../modules/Teacher/pages/TeacherDetail";
import { ScientificArticleDetail } from "../modules/scientific-article/pages/ScientificArticleDetail";

const appRouter = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/teacher/:id",
        element: <TeacherDetail />,
      },
      {
        path: "/scientific-article",
        element: <ScientificArticle />,
      },
      {
        path: "/scientific-article/:id",
        element: <ScientificArticleDetail />,
      },
      {
        path: "/research-project",
        element: <ResearchProject />,
      },
      {
        path: "/research-project/:id",
        element: <ResearchProjectDetail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
