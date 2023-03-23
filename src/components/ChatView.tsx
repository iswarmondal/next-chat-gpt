import React from "react";

interface PropTypes {
  messageHistory: {
    role: string;
    content: string;
  }[];
}

const ChatView: React.FC<PropTypes> = ({ messageHistory }) => {
  return (
    <section className="h-[80vh] w-full px-14 overflow-y-scroll">
      {messageHistory.map((message) => (
        <div
          key={message.content}
          className={`p-4 my-4 ${
            message.role === "assistant"
              ? "bg-blue-200 text-blue-800 mr-96 rounded-t-3xl rounded-r-3xl"
              : "bg-green-200 ml-96 text-green-800 rounded-t-3xl rounded-r-none rounded-l-3xl"
          }`}
        >
          {message.content}
        </div>
      ))}
    </section>
  );
};

export default ChatView;
