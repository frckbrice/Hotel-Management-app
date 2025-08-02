const NewsLetter = () => {
  return (
    <section className="container mx-auto px-4">
      <form className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 sm:px-6 lg:px-8 rounded-xl md:rounded-[30px] flex flex-col justify-center items-center py-8 md:py-16 lg:py-24 shadow-xl mt-10">
        <p className="font-semibold text-base sm:text-lg md:text-xl text-center mb-3">
          Explore More About Our Hotel
        </p>
        <h6 className="font-semibold  text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center">
          Sign Up for Our Newsletter
        </h6>
        <div className="flex flex-col sm:flex-row justify-center w-full pt-8 md:pt-12 gap-4 sm:gap-0">
          <input
            type="email"
            placeholder="Your email"
            className="bg-green-700 h-11 md:h-14 lg:h-16 rounded-xl pl-4 md:pl-6 sm:mr-5 w-full sm:w-[300px] md:w-[400px] lg:w-[452px] text-white placeholder:text-white focus:outline-none border border-green-600 text-sm md:text-base"
          />
          <button
            type="button"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-semibold px-6 py-3 md:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            Subscribe
          </button>
        </div>
      </form>
    </section>
  );
};
export default NewsLetter;
