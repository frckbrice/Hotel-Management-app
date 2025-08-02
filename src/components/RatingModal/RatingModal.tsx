// import React from "react";
// import { BsStarFill } from "react-icons/bs";
// import { SortOrdering } from "sanity";

// type Props = {
//   isOpen: boolean;
//   ratingValue: number;
//   setRatingValue: React.Dispatch<React.SetStateAction<number | null>>;
//   ratingText: string;
//   setRatingText: React.Dispatch<React.SetStateAction<string>>;
//   reviewSubmitHandler: () => Promise<undefined | string>;
//   isSubmittingReview: boolean;
//   toggleRatingModal: () => void;
// };

// const RatingModal = ({
//   isOpen,
//   ratingValue,
//   setRatingValue,
//   ratingText,
//   setRatingText,
//   isSubmittingReview,
//   reviewSubmitHandler,
//   toggleRatingModal,
// }: Props) => {
//   const startValues = [1, 2, 3, 4, 5];

//   return (
//     <div
//       className={`fixed z-[61] inset-0 flex items-center justify-center ${
//         isOpen
//           ? "opacity-100 pointer-events-auto"
//           : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div className=" bg-white w-96 p-4 rounded-lg shadow-lg ">
//         <h2 className=" text-xl  dark:text-gray-800 font-semibold mb-2">
//           Rate your Experience
//         </h2>
//         <div className=" mb4">
//           <label className=" block text-sm font-medium text-gray-700">
//             {" "}
//             Rating
//           </label>
//           <div className=" flex items-center ">
//             {startValues.map((value) => (
//               <button
//                 key={value}
//                 onClick={() => setRatingValue(value)}
//                 className={`w-6 h-6 cursor-pointer ${
//                   ratingValue === value ? "text-yellow-500" : "text-gray-300"
//                 }`}
//               >
//                 <BsStarFill />{" "}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="mb-4 ">
//           <label className=" block text-sm font-medium text-gray-700">
//             {" "}
//             Review Text
//           </label>
//           <textarea
//             name="textReview"
//             id="textReview"
//             rows={4}
//             value={ratingText}
//             onChange={(e) => setRatingText(e.target.value)}
//             className=" w-full px-2 py-3 border rounded-md text-black dark:text-white/10"
//           />
//         </div>
//         <div className=" flex justify-end ">
//           <button
//             className=" px-4 py-2 bg-primary text-white rounded-md"
//             onClick={reviewSubmitHandler}
//             disabled={isSubmittingReview}
//           >
//             {isSubmittingReview ? "Submitting" : "submit"}
//           </button>
//           <button
//             onClick={toggleRatingModal}
//             className=" ml-2 px-4 py-2 bg-gray-300 rounded-md"
//           >
//             {" "}
//             Cancel{" "}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RatingModal;

'use client';

import React from 'react';
import { BsStarFill } from 'react-icons/bs';

type Props = {
  isOpen: boolean;
  ratingValue: number;
  setRatingValue: React.Dispatch<React.SetStateAction<number | null>>;
  ratingText: string;
  setRatingText: React.Dispatch<React.SetStateAction<string>>;
  reviewSubmitHandler: () => Promise<undefined | string>;
  isSubmittingReview: boolean;
  toggleRatingModal: () => void;
};

const RatingModal = ({
  isOpen,
  ratingValue,
  setRatingValue,
  ratingText,
  setRatingText,
  isSubmittingReview,
  reviewSubmitHandler,
  toggleRatingModal,
}: Props) => {
  const starValues = [1, 2, 3, 4, 5];

  const handleCancel = () => {
    setRatingValue(null);
    setRatingText('');
    toggleRatingModal();
  };

  return (
    <div
      className={`fixed inset-0 z-[61] flex items-center justify-center transition-opacity duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } bg-black/30 backdrop-blur-sm`}
    >
      <div className='bg-white w-full max-w-md mx-4 rounded-xl shadow-2xl p-6 space-y-5 animate-fadeIn'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center'>
          Rate Your Experience
        </h2>

        {/* Star Rating */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Your Rating
          </label>
          <div className='flex gap-2 justify-center'>
            {starValues.map(value => (
              <button
                key={value}
                type='button'
                onClick={() => setRatingValue(value)}
                className={`text-2xl transition-colors ${
                  ratingValue >= value ? 'text-yellow-500' : 'text-gray-300'
                } hover:scale-110`}
              >
                <BsStarFill />
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label
            htmlFor='textReview'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Your Review
          </label>
          <textarea
            id='textReview'
            rows={4}
            value={ratingText}
            onChange={e => setRatingText(e.target.value)}
            placeholder='Share your experience...'
            className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
          />
        </div>

        {/* Actions */}
        <div className='flex justify-end gap-3 pt-2'>
          <button
            onClick={handleCancel}
            className='px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition'
          >
            Cancel
          </button>
          <button
            onClick={reviewSubmitHandler}
            disabled={isSubmittingReview}
            className='px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition disabled:opacity-60'
          >
            {isSubmittingReview ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
