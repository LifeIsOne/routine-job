import React, { useState, useEffect } from "react";
import "./Main.css";

const Main = () => {
  const [activeTab, setActiveTab] = useState("routine");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  const successCases = [
    {
      id: 1,
      image: "/images/samsung.jpg",
      company: "삼성SDS",
      position: "SW엔지니어",
    },
    {
      id: 2,
      image: "/images/lg.jpg",
      company: "LG CNS",
      position: "데이터 엔지니어",
    },
    // ... 더 많은 더미 데이터
  ];
  // 상태로 관리
  const [routineData, setRoutineData] = useState({});

  useEffect(() => {
    // 🥬🥬🥬🥬🥬 소켓 통신 🥬🥬🥬🥬🥬
    // WebSocket 연결 추가
    const socket = new WebSocket("ws://localhost:8000/api/routine_list");

    socket.onopen = () => {
      console.log("✅ WebSocket 연결됨");

      const reqData = {
        user_key: "dummy_key_001",
        user_name: "홍길동",
        request_date: new Date().toISOString().slice(0, 10),
      };

      socket.send(JSON.stringify(reqData));
    };

    socket.onmessage = (e) => {
      console.log("서버 응답 데이터:", e.data);

      // 받은 Data를 `JSON`으로 파싱
      let raw = JSON.parse(e.data);
      console.log("응답 전체 데이터:", raw);

      // // `raw`가 'string'이면 한 번 더 파싱
      // if (typeof raw === "string") {
      //   raw = JSON.parse(raw);
      // }
      // `raw`가 문자열이기 때문에 JSON으로 파싱
      raw = JSON.parse(raw);

      // `task_list`가 없으면 경고, 로직 종료
      if (!raw || !raw.task_list) {
        console.warn("⚠️task_list가 없습니다. raw:", raw);
        setRoutineData({ list: [] }); // 렌더링 되게 빈 리스트 전달
        return;
      }

      // `task_list`를 돌며 각 필요한 데이터 가공
      const parsedList = raw.task_list.map((task) => {
        const [h, m, s] = task.execute_time.split(":"); // ":" 기준으로 문자열 분해 ( HH:MM:SS )
        const date = new Date();
        return {
          ...task,
          alarmTime: new Date( // ⏰ 알람 시간을 Date 타입으로 변환
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            h,
            m,
            s
          ),
          completed: task.completed ?? false, // `null`과 `undefined` 방지
          hasAlarm: task.use_timer || !!task.execute_time, // ⏰ 알람 유무
        };
      });
      // 최종 데이터 저장 ( 렌더용 )
      setRoutineData({ list: parsedList });
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      socket.close();
      clearInterval(timer);
    };
  }, []);

  const getTimeRemaining = (alarmTime) => {
    const diff = alarmTime.getTime() - currentTime.getTime();
    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 0) {
      return `${hours}시간 ${minutes}분 남음`;
    } else if (minutes > 0) {
      return `${minutes}분 ${seconds}초 남음`;
    } else {
      return `${seconds}초 남음`;
    }
  };

  const handlePrevDay = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img
            className="img"
            alt="Login Banner"
            src="/assets/images/RoutineJob_logo.png"
          />
        </div>
      </header>

      <div className="success-case-header">
        <h1 className="success-case-title">대기업 취업 성공자 루트 엿보기</h1>
        <div className="subscription-status">구독중</div>
      </div>

      <div className="case-list">
        {successCases.map((item) => (
          <div key={item.id} className="case-item">
            <img src={item.image} alt={item.company} className="case-image" />
            <div className="case-info">
              <div>{item.company}</div>
              <div>{item.position}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tab-section">
        <button
          className={`tab-button ${activeTab === "routine" ? "active" : ""}`}
          onClick={() => setActiveTab("routine")}
        >
          루틴
        </button>
        <button
          className={`tab-button ${activeTab === "job" ? "active" : ""}`}
          onClick={() => setActiveTab("job")}
        >
          취업
        </button>
      </div>

      <div className="date-navigation">
        <button className="arrow-button" onClick={handlePrevDay}>
          ←
        </button>
        <span className="current-date">{formatDate(currentDate)}</span>
        <button className="arrow-button" onClick={handleNextDay}>
          →
        </button>
      </div>

      <div className="routine-list">
        {(routineData.list || []).map((item, index) => (
          <div key={item.task_id} className="routine-row">
            {index === 0 ? (
              <div className="time-block-title">오늘 루틴</div>
            ) : (
              <div className="empty-cell"></div>
            )}
            <div className="task-text">{item.task_name}</div>
            <div className="checkbox-cell">
              <input
                type="checkbox"
                checked={item.completed}
                className="task-checkbox"
                readOnly
              />
            </div>
            <div className="alarm-cell">
              {item.hasAlarm && (
                <div className="alarm-container">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                  <span className="time-remaining">
                    {getTimeRemaining(item.alarmTime)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="floating-button">+</button>
    </div>
  );
};

export default Main;
