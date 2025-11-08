import { useState } from 'react';
import './Community.css';

function Community() {
  const [communities] = useState([
    {
      id: 1,
      name: '농구 동아리',
      category: '스포츠',
      members: 25,
      description: '함께 농구하며 친목을 다지는 동아리입니다.',
      kakaoLink: 'https://open.kakao.com/o/example1'
    },
    {
      id: 2,
      name: '사진 소모임',
      category: '문화예술',
      members: 18,
      description: '사진 촬영과 편집을 함께 배우는 소모임입니다.',
      kakaoLink: 'https://open.kakao.com/o/example2'
    },
    {
      id: 3,
      name: '코딩 스터디',
      category: '학술',
      members: 32,
      description: '알고리즘 문제풀이 및 프로젝트 스터디',
      kakaoLink: 'https://open.kakao.com/o/example3'
    },
    {
      id: 4,
      name: '밴드 동아리',
      category: '문화예술',
      members: 15,
      description: '다양한 악기로 밴드를 구성해 공연합니다.',
      kakaoLink: 'https://open.kakao.com/o/example4'
    },
    {
      id: 5,
      name: '영어 회화 모임',
      category: '학술',
      members: 20,
      description: '자유롭게 영어로 대화하는 모임',
      kakaoLink: 'https://open.kakao.com/o/example5'
    },
    {
      id: 6,
      name: '등산 모임',
      category: '스포츠',
      members: 22,
      description: '주말마다 함께 산을 오르는 모임',
      kakaoLink: 'https://open.kakao.com/o/example6'
    },
    {
      id: 7,
      name: '요리 동아리',
      category: '취미',
      members: 16,
      description: '다양한 요리를 함께 만들어보는 동아리',
      kakaoLink: 'https://open.kakao.com/o/example7'
    },
    {
      id: 8,
      name: '독서 토론 모임',
      category: '학술',
      members: 14,
      description: '책을 읽고 함께 토론하는 모임',
      kakaoLink: 'https://open.kakao.com/o/example8'
    },
    {
      id: 9,
      name: '댄스 동아리',
      category: '문화예술',
      members: 28,
      description: 'K-POP 댄스를 배우고 공연하는 동아리',
      kakaoLink: 'https://open.kakao.com/o/example9'
    }
  ]);

  const [filter, setFilter] = useState('전체');

  const filteredCommunities = filter === '전체' 
    ? communities 
    : communities.filter(community => community.category === filter);

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>동아리 & 소모임</h1>
        <p>관심사가 같은 친구들과 함께하세요!</p>
      </div>

      <div className="filter-buttons">
        <button 
          className={filter === '전체' ? 'active' : ''} 
          onClick={() => setFilter('전체')}
        >
          전체
        </button>
        <button 
          className={filter === '스포츠' ? 'active' : ''} 
          onClick={() => setFilter('스포츠')}
        >
          스포츠
        </button>
        <button 
          className={filter === '학술' ? 'active' : ''} 
          onClick={() => setFilter('학술')}
        >
          학술
        </button>
        <button 
          className={filter === '문화예술' ? 'active' : ''} 
          onClick={() => setFilter('문화예술')}
        >
          문화예술
        </button>
        <button 
          className={filter === '취미' ? 'active' : ''} 
          onClick={() => setFilter('취미')}
        >
          취미
        </button>
      </div>

      <div className="community-grid">
        {filteredCommunities.map(community => (
          <div key={community.id} className="community-card">
            <div className="community-header-card">
              <h3>{community.name}</h3>
              <span className="community-category">{community.category}</span>
            </div>
            <p className="community-members">👥 {community.members}명</p>
            <p className="community-description">{community.description}</p>
            <a 
              href={community.kakaoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="kakao-button"
            >
              💬 오픈채팅 참여하기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
