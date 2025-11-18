import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-[70vh] bg-gradient-to-b from-slate-900/60 via-slate-900/60 to-slate-900/90 pointer-events-none">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            A social app built for creators
          </h1>
          <p className="mt-4 text-slate-200/90 max-w-2xl mx-auto text-base md:text-lg">
            Choose what you want your audience to see. Segments, not a black-box algorithm. Discover top creators in every field.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
