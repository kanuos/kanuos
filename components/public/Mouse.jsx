import { BsMouse } from "react-icons/bs";

const Mouse = () => {
  return (
    <div className="p-4 w-full text-center">
      <BsMouse className="animate-bounce mx-auto text-2xl" />
      <p className="text-xs inline-flex my-2 items-center justify-center gap-x-0.5 w-max mx-auto font-bold uppercase animate-pulse">
        <small>scroll</small>
      </p>
    </div>
  );
};

export default Mouse;
