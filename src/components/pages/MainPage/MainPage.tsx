import logo from "@/assets/logo.webp";

const MainPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Home</h1>
      <div className="w-full flex items-center justify-center">
        <img
          src={logo}
          alt="Pytainer Logo"
          className="w-[200px] md:w-[400px] xl:w-[600px]"
        />
      </div>
    </div>
  );
};

export default MainPage;
