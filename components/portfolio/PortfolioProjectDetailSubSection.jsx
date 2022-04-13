const PortfolioProjectDetailSubSection = ({ category, array }) => {
  return (
    <div className="p-10 flex flex-col gap-y-20 w-full">
      <section className="w-full px-3 flex flex-col gap-y-20">
        {array.map((tech, i) => (
          <div key={i} className="block my-3 md:max-w-md">
            <p className="flex flex-col items-start text-xs uppercase mb-2">
              <small className="text-secondary font-semibold">{category}</small>
              <span className="text-lg font-semibold block -mt-1">
                {tech.heading}
              </span>
            </p>
            <p className="text-xs opacity-75">
              {tech.text} Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Adipisci voluptatibus officiis quis vero neque perspiciatis
              quasi excepturi maiores architecto modi.{" "}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PortfolioProjectDetailSubSection;
