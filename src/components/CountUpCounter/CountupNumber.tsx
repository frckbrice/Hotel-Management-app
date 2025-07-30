import { timeStamp } from 'console';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  endValue: number;
  durations: number;
};

const CountUpNumber: FC<Props> = ({ endValue, durations }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < durations) {
        setCount(Math.min(endValue, (progress / durations) * endValue));
        animationFrameId = requestAnimationFrame(updateCount);
      } else setCount(endValue);
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, durations]);

  return (
    <p className='md:font-bold font-medium text-lg xl:text-5xl'>
      {Math.round(count)}
    </p>
  );
};

export default CountUpNumber;
