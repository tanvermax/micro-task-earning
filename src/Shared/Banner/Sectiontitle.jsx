const Sectiontitle = ({ heading, subheading }) => {
  return (
    <div className=" flex items-center justify-center ">
      <div className="text-center">
        <h1 className="lg:text-4xl text-[8px] font-bold  ">{heading}</h1>
        <p className="mt-4 lg:text-lg text-[6px]">{subheading}</p>
      </div>
    </div>
  );
};

export default Sectiontitle;
