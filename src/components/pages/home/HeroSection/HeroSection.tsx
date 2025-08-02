import React from "react";
import { heading1, section2 } from "./ServerComponent";
import ClientComponent from "./ClientComponent";

const HeroSection = () => {
  return <ClientComponent section2={section2} heading1={heading1} />;
};

export default HeroSection;
