const Sectiontitle = ({ heading, subheading }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="lg:text-4xl text-xl font-bold text-[#b1804e]">{heading}</h1>
        <p className="mt-4 lg:text-lg text-xs">{subheading}</p>
      </div>
    </div>
  );
};

export default Sectiontitle;
