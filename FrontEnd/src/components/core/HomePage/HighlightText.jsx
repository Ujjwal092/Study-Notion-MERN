import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="font-bold  bg-blue-text-gradient bg-clip-text text-transparent">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;

//==============ARROW FUNCN============
// export const HighlightText = ({text}) => {
//   return(
//     <div>

//     </div>
//   )
// }

//================Traditional funcn =================
// export function HighlightText(){
//   return(
//     <div>

//     </div>
//   )
// }
