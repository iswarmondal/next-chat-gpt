import React, { useState } from "react";
import AudioPlayer from "../../components/AudioPlayer";
import AudioSelectionForm from "../../components/AudioSelectionForm";
import ShowTranscript from "../../components/ShowTranscript";

const Speak = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [response, setResponse] = useState<any>({});
  return (
    <div className="max-w-md mx-auto">
      <AudioSelectionForm
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setResponse={setResponse}
      />
      <AudioPlayer selectedFile={selectedFile} />
      <ShowTranscript text={response?.data?.text ?? ""} />
    </div>
  );
};

export default Speak;
