import React, { useState, useEffect } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

function EmojiPicker() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojisFromServer, setEmojisFromServer] = useState([]);


  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
  };

 
  const saveEmojiToServer = async () => {
    if (selectedEmoji) {
      try {
        const response = await fetch('/api/save-emoji', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emoji: selectedEmoji }),
        });
        const data = await response.json();
        console.log(data.message);
        fetchEmojis();
      } catch (error) {
        console.error('이모지 저장 중 오류 발생:', error);
      }
    }
  };

  const fetchEmojis = async () => {
    try {
      const response = await fetch('/api/get-emojis');
      const data = await response.json();
      setEmojisFromServer(data);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };


  useEffect(() => {
    fetchEmojis();
  }, []);

  return (
    <div>
      <Picker onSelect={handleEmojiSelect} />
      {selectedEmoji && (
        <div>
          <p>선택한 이모지: {selectedEmoji}</p>
          <button onClick={saveEmojiToServer}>이모지 저장</button>
        </div>
      )}
      <div>
        {emojisFromServer.map((emoji, index) => (
          <span key={index} style={{ fontSize: '2rem', marginRight: '10px' }}>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

export default EmojiPicker;