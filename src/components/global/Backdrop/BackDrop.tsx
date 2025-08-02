import React from "react";

type Props = {
  isOpen: boolean;
};

const BackDrop = ({ isOpen }: Props) => {
  // console.log("inside backdrop: ", isOpen);
  let content: React.ReactNode = <></>;
  if (isOpen)
    content = (
      <div className="fixed z-[60] top-0 left-0 w-screen h-screen bg-black opacity-50" />
    );

  return content;
};

export default BackDrop;
