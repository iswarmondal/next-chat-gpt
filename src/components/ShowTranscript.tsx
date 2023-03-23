import React, { FC } from "react";

interface PropTypes {
  text: string;
}

const ShowTranscript: FC<PropTypes> = ({ text }) => {
  return (
    <>
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 my-4">
        <p className="text-gray-800">{text}</p>
      </div>
    </>
  );
};

export default ShowTranscript;
