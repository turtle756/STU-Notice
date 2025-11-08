import { useState } from 'react';
import './Events.css';

function Events() {
  const [events] = useState([
    {
      id: 1,
      title: '2024 가을 축제',
      category: '행사',
      date: '2024.11.15 - 2024.11.16',
      image: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Fall+Festival',
      description: '우리 대학 가을 축제에 여러분을 초대합니다!'
    },
    {
      id: 2,
      title: '창업 아이디어 공모전',
      category: '공모전',
      date: '2024.11.20',
      image: 'https://via.placeholder.com/300x200/50C878/FFFFFF?text=Startup+Contest',
      description: '혁신적인 창업 아이디어를 공모합니다.'
    },
    {
      id: 3,
      title: '겨울 MT',
      category: '행사',
      date: '2024.12.05',
      image: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Winter+MT',
      description: '학과 MT에 참여하세요!'
    },
    {
      id: 4,
      title: '글쓰기 경진대회',
      category: '공모전',
      date: '2024.11.30',
      image: 'https://via.placeholder.com/300x200/9B59B6/FFFFFF?text=Writing+Contest',
      description: '당신의 글솜씨를 뽐내보세요.'
    },
    {
      id: 5,
      title: '체육대회',
      category: '행사',
      date: '2024.12.10',
      image: 'https://via.placeholder.com/300x200/F39C12/FFFFFF?text=Sports+Day',
      description: '다양한 종목으로 진행되는 체육대회'
    },
    {
      id: 6,
      title: '프로그래밍 해커톤',
      category: '공모전',
      date: '2024.12.15',
      image: 'https://via.placeholder.com/300x200/34495E/FFFFFF?text=Hackathon',
      description: '24시간 코딩 마라톤에 도전하세요!'
    }
  ]);

  const [filter, setFilter] = useState('전체');

  const filteredEvents = filter === '전체' 
    ? events 
    : events.filter(event => event.category === filter);

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>교내 행사 & 공모전</h1>
        <p>다양한 교내 활동에 참여해보세요!</p>
      </div>

      <div className="filter-buttons">
        <button 
          className={filter === '전체' ? 'active' : ''} 
          onClick={() => setFilter('전체')}
        >
          전체
        </button>
        <button 
          className={filter === '행사' ? 'active' : ''} 
          onClick={() => setFilter('행사')}
        >
          행사
        </button>
        <button 
          className={filter === '공모전' ? 'active' : ''} 
          onClick={() => setFilter('공모전')}
        >
          공모전
        </button>
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} />
            <div className="event-content">
              <span className="event-category">{event.category}</span>
              <h3>{event.title}</h3>
              <p className="event-date">📅 {event.date}</p>
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
