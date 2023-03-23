import React, { useState } from "react";
import ChatView from "../components/ChatView";
import TextInput from "../components/TextInput";
interface currentNewMesType {
  role: string;
  content: string;
}
function Chat() {
  const [messageHistory, setMessageHistory] = useState([
    {
      role: "system",
      content:
        "Your are the Gandhi reincarnated. Respond as if Gandhi would response",
    },
  ]);

  const pushNewMessage = (currentNewMes: currentNewMesType) => {
    let tempVar = [...messageHistory, currentNewMes];
    setMessageHistory(tempVar);
  };

  return (
    <>
      <main className="flex flex-col justify-start items-center min-h-[100vh] bg-slate-200 p-0 m-0">
        <h1 className="text-3xl font-bold text-green-800 pt-3">ChatGPT</h1>

        <ChatView messageHistory={messageHistory} />
        <TextInput
          messageHistory={messageHistory}
          onUpdateMessage={pushNewMessage}
        />
      </main>
    </>
  );
}

export default Chat;
