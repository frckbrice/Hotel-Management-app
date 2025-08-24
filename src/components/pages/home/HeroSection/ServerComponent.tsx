import LazyImage from "@/components/optimization/LazyImage";

export const heading1 = (
  <>
    {" "}
    <h1 className="font-heading mb-8 lg:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
      {" "}
      Explore Our Exquisite Hotel
    </h1>
    <p className="text-gray-700 mt-4 dark:text-gray-300 mb-8 lg:mb-12 max-w-lg text-base sm:text-lg text-justify">
      Experience an Exquisite Hotel Immersed in Rich History and Timeless
      Elegance.
    </p>
    <button className="btn-primary text-sm sm:text-base px-6 py-3 lg:px-8 lg:py-4">
      {" "}
      Get Started
    </button>
  </>
);

export const section2 = (
  <>
    <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1">
      <div className="rounded-2xl overflow-hidden h-44 sm:h-52 lg:h-60">
        <LazyImage
          src="/images/visualsofdana.jpg"
          alt="Hotel garden view showcasing beautiful landscaping and outdoor amenities"
          width={580}
          height={200}
          priority={true}
          placeholderText="Hotel Garden View"
          showPlaceholderText={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAAAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      <div className="grid h-38 sm:h-44 lg:h-52 gap-4 sm:gap-6 lg:gap-8 grid-cols-2">
        <div className="rounded-2xl overflow-hidden h-44 sm:h-52 lg:h-60">
          <LazyImage
            src="/images/jean.jpg"
            alt="Hotel interior showcasing modern design and luxury amenities"
            width={280}
            height={200}
            placeholderText="Hotel Interior"
            showPlaceholderText={true}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            quality={75}
            priority={true}
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAAAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
        <div className="rounded-2xl overflow-hidden h-44 sm:h-52 lg:h-60">
          <LazyImage
            src="/images/roberto.jpg"
            alt="Hotel exterior view highlighting architectural beauty and surroundings"
            width={280}
            height={200}
            placeholderText="Hotel Exterior"
            showPlaceholderText={true}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            quality={75}
            priority={true}
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAAAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      </div>
    </div>
  </>
);
