export const VideoBG = () => {
  return (
    <video 
        muted
        autoPlay
        loop
        poster='/hero.webp'
        playsInline={true}
        className='h-screen w-screen object-cover block pointer-events-none opacity-20 fixed inset-0 -z-10'>
        <source src='/pf.webm' type='video/webm'/>
        <source src='/pf.mp4' type='video/mp4'/>
    </video>
  )
}
