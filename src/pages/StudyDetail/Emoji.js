import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import '../../style/Emoji.css';

const Emoji = () => {
  const [EmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [emojiList, setEmojiList] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studyId = queryParams.get('studyId');

  const handleEmojiClick = (emojiObject) => {
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
      const response = await fetch('https://two-forest-of-study-4-be.onrender.com/emojis/emoji', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emoji, studyId }),
      });

      if (!response.ok) {
        throw new Error('Failed to save emoji');
      }
    } catch (error) {
      console.error('Error saving emoji:', error);
    }
  };

  const getEmojis = async () => {
    try {
      const response = await fetch(`https://two-forest-of-study-4-be.onrender.com/emojis/emoji?studyId=${studyId}`);
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
    const emojiArray = emojis.map(({ emoji, _count }) => ({
      emoji,
      count: _count.emoji,
    }));
    setEmojiList(emojiArray); 
  };

  useEffect(() => {
    if (studyId) {
      getEmojis();
    }
  }, [studyId]);

  return (
    <div>
      <div>
        {emojiList.map(({ emoji, count }) => (
          <button className='emojiButton' key={emoji} onClick={() => handleEmojiClick({ emoji })}>
            {emoji} {count}
          </button>
        ))}
      </div>

      <button className='emojiButton' onClick={() => setEmojiPickerVisible(prev => !prev)}>
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