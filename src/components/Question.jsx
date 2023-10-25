import React from "react";

const Question = ({
  dialogue,
}) => {

  return (
    <div>
      <p className="text-lg font-bold mb-2">{dialogue}</p>
    </div>
  );
};

export default Question;
