import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
} from "react";

interface PropTypes {
  setSelectedFile: Dispatch<SetStateAction<any>>;
  selectedFile: File | null;
  setResponse: Dispatch<SetStateAction<any>>;
}

const AudioSelectionForm: FC<PropTypes> = ({
  setSelectedFile,
  selectedFile,
  setResponse,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResponse("");
    setLoading(true);
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("audioFile", selectedFile, selectedFile.name);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_serverBaseURL}/transcribe`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      setResponse(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="audioFile"
          >
            Upload an audio file
          </label>
          <input
            type="file"
            name="audioFile"
            id="audioFile"
            accept="audio/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={!selectedFile}
            className={`${
              selectedFile && !loading
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AudioSelectionForm;
