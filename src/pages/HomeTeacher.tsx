import React, { useEffect, useState } from "react";
import CardDataStats from "../components/CardDataStats";
import ChartOne from "../components/Charts/ChartOne";
import TableOne from "../components/Tables/TableOne";
import { BookCopy, CalendarArrowUp, Newspaper, ThumbsUp } from "lucide-react";
import { IconKey, ReportData } from "../types/Teacher/Home";
import Loader from "../common/Loader";
import { getReportTeacherById } from "../services/Teacher/ReportData";

const iconMap: Record<IconKey, JSX.Element> = {
  BookCopy: <BookCopy className="text-primary dark:text-white" size={21} />,
  Newspaper: <Newspaper className="text-primary dark:text-white" size={21} />,
  CalendarArrowUp: (
    <CalendarArrowUp className="text-primary dark:text-white" size={21} />
  ),
  ThumbsUp: <ThumbsUp className="text-primary dark:text-white" size={21} />,
};

const HomeTeacher: React.FC = () => {
  const userData = sessionStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user.id)
        const data = await getReportTeacherById(user.id);
        console.log(data)
        setData(data);
      } catch (err) {
        console.error("Error al obtener el reporte:", err);
      }
    };

    fetchData();
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
