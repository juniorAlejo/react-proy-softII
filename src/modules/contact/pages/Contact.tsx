const teamMembers = [
  {
    name: "ABEL RIVAS SERRANO",
    position: "Analista",
    email: " 212136@unamba.edu.pe",
    image: "/images/integrante-1.jpeg",
  },
  {
    name: "EDGARD JHABEL CALLA ROJAS",
    position: "Tester",
    email: "212109@unamba.edu.pe",
    image: "/images/integrante-5.jpeg",
  },
  {
    name: "VICTOR MANUEL ALEJO ANDRADE",
    position: "Programador frontend",
    email: "212108@unamba.edu.pe",
    image: "/images/integrante-2.jpeg",
  },
  {
    name: "CRISTIAN MOSQUEIRA HUAMANÑAHUI",
    position: "Jefe de proyecto",
    email: "181223@unamba.edu.pe",
    image: "/images/integrante-3.jpeg",
  },
  {
    name: "ZAITH KRISTHIAN PEÑA",
    position: "Programador backend",
    email: "212131@unamba.edu.pe",
    image: "/images/integrante-6.jpeg",
  },
  {
    name: "Mijamin Taipe Ccana",
    position: "Diseñador",
    email: "212140@unamba.edu.pe",
    image: "/images/integrante-4.jpeg",
  },
  {
    name: "WALDIR SEÑO CHIPANE",
    position: "Diseñador UX y UI",
    email: "172170@unamba.edu.pe",
    image: "/images/integrante-7.jpeg",
  },
];

export const Contact = () => {
  return (
    <div className="mt-[180px] sm:mt-25 max-w-screen-lg mx-auto p-5">
      <div className="grid grid-cols-4 gap-4">
        {teamMembers.slice(0, 4).map((member, index) => (
          <div key={index} className="text-center">
            <img
              src={member.image}
              alt={member.name}
              className="mx-auto mb-2 w-40 h-40 object-cover rounded-lg"
            />
            <p className="font-bold">{member.name}</p>
            <p>{member.position}</p>
            <strong>Correo:</strong>
            <a href={`mailto:${member.email}`} className="text-blue-500 block">
              {member.email}
            </a>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {teamMembers.slice(4, 7).map((member, index) => (
          <div key={index} className="text-center">
            <img
              src={member.image}
              alt={member.name}
              className="mx-auto mb-2 w-40 h-40 object-cover rounded-lg"
            />
            <p className="font-bold">{member.name}</p>
            <p>{member.position}</p>
            <strong>Correo:</strong>
            <a href={`mailto:${member.email}`} className="text-blue-500 block">
              {member.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
