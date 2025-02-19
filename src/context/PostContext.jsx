import { createContext, useContext, useState } from "react";

// 1. CREATE A CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
  const [participants, setParticipants] = useState([{ id: 1 }, { id: 2 }]);

  const handleAddParticipant = (e) => {
    e.preventDefault();
    setParticipants([...participants, { id: participants.length + 1 }]);
  };

  return (
    <PostContext.Provider
      value={{
        handleAddParticipant,
        participants,
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
