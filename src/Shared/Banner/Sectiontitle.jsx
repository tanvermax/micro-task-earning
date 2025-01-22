const Sectiontitle = ({ heading, subheading }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{heading}</h1>
        <p className="mt-4 text-lg">{subheading}</p>
      </div>
    </div>
  );
};

export default Sectiontitle;
