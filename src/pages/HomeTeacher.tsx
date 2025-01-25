import React from "react";
import CardDataStats from "../components/CardDataStats";
import ChartOne from "../components/Charts/ChartOne";
import { BookCopy, CalendarArrowUp, Newspaper, ThumbsUp } from "lucide-react";
import TableOne from "../components/Tables/TableOne";

const HomeTeacher: React.FC = () => {
  return (
    <>
      <div className="flex items-center space-x-2  mb-5">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://img.freepik.com/foto-gratis/cierrese-encima-retrato-cara-joven-hombre-barbudo_171337-2887.jpg?semt=ais_incoming"
            alt="Foto del usuario"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-2xl block font-medium text-black dark:text-white">
          Hola, <span className="font-bold">Docente Jhair 👋</span>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total de proyectos"
          total="12"
          rate="0.43%"
          levelUp
        >
          <BookCopy className="text-primary dark:text-white" size={21} />
        </CardDataStats>
        <CardDataStats
          title="Total de articulos"
          total="21"
          rate="4.35%"
          levelUp
        >
          <Newspaper className="text-primary dark:text-white" size={21} />
        </CardDataStats>
        <CardDataStats title="Ultimos proyectos" total="2" rate="2.59%" levelUp>
          <CalendarArrowUp className="text-primary dark:text-white" size={21} />
        </CardDataStats>
        <CardDataStats title="Total de likes" total="56" rate="0.95%" levelDown>
          <ThumbsUp className="text-primary dark:text-white" size={21} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <ChartOne />
        </div>
        <div className="col-span-12 xl:col-span-5 ">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default HomeTeacher;
