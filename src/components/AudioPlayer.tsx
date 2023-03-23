import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface PropTypes {
  selectedFile: File | null;
}

const AudioPlayer: FC<PropTypes> = ({ selectedFile }) => {
  const [audio, setAudio] = useState<null | string>(null);

  useEffect(() => {
    if (selectedFile) setAudio(URL.createObjectURL(selectedFile));
  }, [selectedFile]);

  return (
    <div>
      {audio && (
        <audio controls>
          <source src={audio} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};
export default AudioPlayer;
