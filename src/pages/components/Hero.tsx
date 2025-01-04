export const Hero = () => {
  return (
    <section className="h-[520px] bg-hero bg-no-repeat bg-center bg-cover py-24 mt-20 relative">
      <div className="container mx-10 h-full relative">
        <div className="flex">
          <h3 className="text-4xl text-white md:text-4xl font-bold mb-4 drop-shadow-lg">
            Bienvenido al repositorio de la Universidad
            <br />
            Nacional Micaela Bastidas de Apurímac
          </h3>
        </div>
      </div>

      <div className="absolute left-0 w-full bottom-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,250C360,320 1080,320 1440,250L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};
