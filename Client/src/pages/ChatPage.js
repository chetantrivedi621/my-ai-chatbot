import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import ChatBox from '../components/ChatBox';
import styles from '../styles/ChatPage.module.css';

function ChatPage() {
  const { user } = useAuth();
  const { chatHistory, setChatHistory } = useContext(ChatContext);
  const [selectedChat, setSelectedChat] = useState('New chat');
  const [messages, setMessages] = useState([]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New chat',
      messages: []
    };
    setChatHistory([...chatHistory, newChat]);
    setSelectedChat(newChat.title);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        {/* New Chat Button */}
        <button onClick={createNewChat} className={styles.newChatButton}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New chat</span>
        </button>

        {/* Chat History */}
        <div className={styles.chatList}>
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat.title);
                setMessages(chat.messages || []);
              }}
              className={`${styles.chatItem} ${selectedChat === chat.title ? styles.chatItemActive : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>{chat.title}</span>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <span>{user?.name?.[0]?.toUpperCase() || 'A'}</span>
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.name || 'User'}</p>
            <p className={styles.userEmail}>{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.mainChat}>
        {/* Chat Header */}
        <div className={styles.chatHeader}>
          <h1 className={styles.chatTitle}>{selectedChat}</h1>
        </div>

        {/* Chat Interface */}
        <div className={styles.messageContainer}>
          <ChatBox messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
