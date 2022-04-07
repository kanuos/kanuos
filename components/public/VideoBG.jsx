export const VideoBG = () => {
  return (
    <video
      muted
      preload="auto"
      autoPlay
      loop
      poster="/hero.webp"
      playsInline
      className="h-screen w-screen object-cover block pointer-events-none opacity-10 fixed inset-0 z-0"
    >
      <source src="/pf.webm" type="video/webm" />
      <source src="/pf.mp4" type="video/mp4" />
    </video>
  );
};
