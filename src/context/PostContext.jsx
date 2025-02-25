import { createContext, useContext, useState } from "react";

// 1. CREATE A CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
  const [participants, setParticipants] = useState([{ id: 1 }, { id: 2 }]);

  const handleAddParticipant = (e) => {
    e.preventDefault();
    setParticipants([...participants, { id: participants.length + 1 }]);
  };

  const inputStyles = [
    "mb-2",
    "py-4",
    "px-4",
    "rounded-xl",
    "text-m",
    "bg-gray-100",
  ];

  return (
    <PostContext.Provider
      value={{
        handleAddParticipant,
        participants,
        inputStyles,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  return context;
}

export { PostProvider, usePosts };
