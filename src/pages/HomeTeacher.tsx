import React, { useEffect, useState } from "react";
import CardDataStats from "../components/CardDataStats";
import ChartOne from "../components/Charts/ChartOne";
import TableOne from "../components/Tables/TableOne";
import { BookCopy, CalendarArrowUp, Newspaper, ThumbsUp } from "lucide-react";
import { IconKey, UserData } from "../types/Teacher/Home";
import Loader from "../common/Loader";

const iconMap: Record<IconKey, JSX.Element> = {
  BookCopy: <BookCopy className="text-primary dark:text-white" size={21} />,
  Newspaper: <Newspaper className="text-primary dark:text-white" size={21} />,
  CalendarArrowUp: (
    <CalendarArrowUp className="text-primary dark:text-white" size={21} />
  ),
  ThumbsUp: <ThumbsUp className="text-primary dark:text-white" size={21} />,
};

const HomeTeacher: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const fetchedData: UserData = {
        user: {
          name: "Docente Admin",
          profileImage:
          "https://s3.abcstatics.com/media/summum/2021/10/01/maxi_iglesias-kU2E--1248x698@abc.jpeg",
        },
        stats: [
          {
            title: "Total de proyectos",
            total: "12",
            rate: "0.43%",
            levelUp: true,
            icon: "BookCopy",
          },
          {
            title: "Total de artículos",
            total: "21",
            rate: "4.35%",
            levelUp: true,
            icon: "Newspaper",
          },
          {
            title: "Últimos proyectos",
            total: "2",
            rate: "2.59%",
            levelUp: true,
            icon: "CalendarArrowUp",
          },
          {
            title: "Total de likes",
            total: "56",
            rate: "0.95%",
            levelUp: false,
            icon: "ThumbsUp",
          },
        ],
        grafico: {
          series: [
            {
              name: "Proyectos",
              data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
            },
            {
              name: "Artículos",
              data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
            },
          ],
        },
        tabla: [
          {
            name: "La inflación de marzo fue 7,7% según INDEC",
            date: "12/12/2014",
          },
          {
            name: "El equipo de básquet venció a Huracán",
            date: "12/12/2014",
          },
          {
            name: "El equipo de básquet venció a Huracán",
            date: "12/12/2014",
          },
          {
            name: "El equipo de básquet venció a Huracán",
            date: "12/12/2014",
          },
        ],
      };

      setData(fetchedData); 
    }, 1000);
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      {data && (
        <>
          <div className="flex items-center space-x-2 mb-5">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={data.user.profileImage}
                alt="Foto del usuario"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl block font-medium text-black dark:text-white">
              Hola, <span className="font-bold">{data.user.name} 👋</span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {data.stats.map((stat, index) => (
              <CardDataStats
                key={index}
                title={stat.title}
                total={stat.total}
                rate={stat.rate}
                levelUp={stat.levelUp}
              >
                {iconMap[stat.icon]}
              </CardDataStats>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 xl:col-span-7">
              <ChartOne series={data.grafico.series} />
            </div>
            <div className="col-span-12 xl:col-span-5">
              <TableOne brandData={data.tabla} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeTeacher;
