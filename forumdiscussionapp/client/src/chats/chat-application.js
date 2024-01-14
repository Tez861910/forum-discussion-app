import React, { useState } from "react";
import { PrivateChat } from "./private-chat";
import { GroupChat } from "./group-chat";

export const ChatApplication = () => {
  const [showPrivateChat, setShowPrivateChat] = useState(true);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => setShowPrivateChat(true)}>
              Private Chat
            </button>
          </li>
          <li>
            <button onClick={() => setShowPrivateChat(false)}>
              Group Chat
            </button>
          </li>
        </ul>
      </nav>

      {showPrivateChat ? <PrivateChat /> : <GroupChat />}
    </div>
  );
};
