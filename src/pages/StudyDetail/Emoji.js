import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import '../../style/Emoji.css'

const Emoji = () => {
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [emojiList, setEmojiList] = useState([]);

  const handleEmojiClick = (event, emojiObject) => {
    const selectedEmoji = emojiObject.emoji;
    setText(prevText => prevText + selectedEmoji);
    setEmojiPickerVisible(false);
    saveEmojiToServer(selectedEmoji);
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(prevState => !prevState);
  };

  const saveEmojiToServer = async (emoji) => {
    try {
      const response = await fetch('http://your-server-url.com/api/emojis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emoji }),
      });

      if (!response.ok) {
        throw new Error('Failed to save emoji');
      }

      const result = await response.json();
      console.log('Emoji saved:', result);
      fetchEmojisFromServer();
    } catch (error) {
      console.error('Error saving emoji:', error);
    }
  };

  const fetchEmojisFromServer = async () => {
    try {
      const response = await fetch('http://your-server-url.com/api/emojis');
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
    fetchEmojisFromServer();
  }, []);

  return (
    <div>
      <ul>
        {emojiList.map(({ emoji, count }) => (
          <li key={emoji}>
            {emoji} {count}
          </li>
        ))}
      </ul>
      <button onClick={toggleEmojiPicker}>
        추가
      </button>
      {isEmojiPickerVisible && (
        <div style={{ position: 'absolute', zIndex: 1 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      
    </div>
  );
};

export default Emoji;