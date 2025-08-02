export type UpdateReviewDto = {
  reviewText: string;
  userRating: number;
  reviewId: string;
};

export type CreateReviewDto = {
  hotelRoomId: string;
  reviewText: string;
  userRating: number;
  userId: string;
};

export type Review = {
  text: string;
  user: {
    name: string;
  };
  userRating: number;
  _createAt: Date;
  _id: string;
};
