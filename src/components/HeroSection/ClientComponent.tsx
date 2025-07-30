"use client";
import React, { FC } from "react";
import CountUpNumber from "../CountUpCounter/CountupNumber";

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};

const ClientComponent: FC<Props> = (props) => {
  const { heading1, section2 } = props;
  return (
    <section className="flex flex-col lg:flex-row px-4 lg:px-8 items-center gap-8 lg:gap-12 container mx-auto">
      <div className="py-6 lg:py-10 h-full w-full lg:w-1/2">
        {heading1}

        {/* Room description */}
        <div className="flex justify-between mt-8 lg:mt-12">
          <div className="flex gap-2 lg:gap-3 flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-xl text-center">Basic Room</p>
            <CountUpNumber durations={3000} endValue={100} />
          </div>
          <div className="flex gap-2 lg:gap-3 flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-xl text-center">Luxury Room</p>
            <CountUpNumber durations={3000} endValue={10} />
          </div>
          <div className="flex gap-2 lg:gap-3 flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-xl text-center">Suite</p>
            <CountUpNumber durations={5000} endValue={40} />
          </div>
        </div>
      </div>
      {/*The avantage here is image load fast than in the client components*/}
      <div className="w-full lg:w-1/2">
        {section2}
      </div>
    </section>
  );
};

export default ClientComponent;
