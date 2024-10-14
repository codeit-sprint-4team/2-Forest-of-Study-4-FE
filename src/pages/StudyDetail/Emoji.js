import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import '../../style/Emoji.css';

const Emoji = () => {
  const [EmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [emojiList, setEmojiList] = useState([]);

  const handleEmojiClick = (event, emojiObject) => {
    const selectedEmoji = emojiObject.emoji;
    setEmojiPickerVisible(false);
    

    const existingEmoji = emojiList.find(item => item.emoji === selectedEmoji);
    if (existingEmoji) {

      setEmojiList(prevList =>
        prevList.map(item =>
          item.emoji === selectedEmoji
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setEmojiList(prevList => [...prevList, { emoji: selectedEmoji, count: 1 }]);
    }
    saveEmoji(selectedEmoji);
  };


  const saveEmoji = async (emoji) => {
    try {
      const response = await fetch('주소주소', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emoji }),
      });

      if (!response.ok) {
        throw new Error('Failed to save emoji');
      }
      getEmoji();
    } catch (error) {
      console.error('Error saving emoji:', error);
    }
  };

  const getEmoji = async () => {
    try {
      const response = await fetch('주소주소');
      if (!response.ok) {
        throw new Error('Failed to fetch emojis');
      }
      const emojis = await response.json();
      processEmojiList(emojis);
    } catch (error) {
      console.error('Error fetching emojis:', error);
    }
  };

  const processEmojiList = (emojis) => {
    const emojiCountMap = emojis.reduce((acc, emoji) => {
      acc[emoji] = (acc[emoji] || 0) + 1;
      return acc;
    }, {});

    const emojiArray = Object.entries(emojiCountMap).map(([emoji, count]) => ({
      emoji,
      count,
    }));

    setEmojiList(emojiArray); 
  };

  useEffect(() => {
    getEmoji();
  }, []);

  return (
    <div>
      <div>
        {emojiList.map(({ emoji, count }) => (
          <button key={emoji} onClick={() => handleEmojiClick(null, { emoji })}>
            {emoji} {count}
          </button>
        ))}
      </div>

      <button onClick={() => setEmojiPickerVisible(prev => !prev)}>
        이모지 추가
      </button>

      {EmojiPickerVisible && (
        <div style={{ position: 'absolute', zIndex: 1 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Emoji;