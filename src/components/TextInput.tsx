import React, { useEffect, FormEvent, FC } from "react";

interface PropTypes {
  messageHistory: {
    role: string;
    content: string;
  }[];
  onUpdateMessage: (currentNewMes: { role: string; content: string }) => void;
}

const TextInput: FC<PropTypes> = ({ onUpdateMessage, messageHistory }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [updateScope, setUpdateScope] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    let userMsg = {
      role: "user",
      content: inputValue,
    };

    onUpdateMessage(userMsg);
    setInputValue("");
    setUpdateScope(!updateScope);
  };

  const doCallChatGpt = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_apiBaseURL}/chat`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messageStack: messageHistory }),
        }
      );

      const data = await response.json();
      onUpdateMessage(data);
      setUpdateScope(!updateScope);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        alert("Unable to perform the action!!!");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (updateScope) {
      doCallChatGpt();
    }
  }, [updateScope]);

  return (
    <>
      {loading && (
        <div className="w-full h-[10vh] z-10 bg-white/70 absolute bottom-0 message-sending-animation cursor-progress"></div>
      )}
      <form
        onSubmit={handleSubmit}
        className="h-[10vh] w-full flex justify-evenly items-center bg-green-800 text-white overflow-hidden absolute bottom-0"
      >
        <input
          id="messageInput"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target?.value)}
          className="w-[70%] p-5 bg-zinc-200 rounded-md text-black"
        />
        <button
          type="submit"
          className="p-5 rounded-md bg-white text-black hover:bg-zinc-300"
        >
          GO
        </button>
      </form>
    </>
  );
};

export default TextInput;
