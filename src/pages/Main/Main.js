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

  // 하드코딩
  // const routineData = {
  //   morning: {
  //     title: "아침",
  //     tasks: [
  //       {
  //         id: 1,
  //         task: "스트레칭 하기",
  //         completed: true,
  //         hasAlarm: true,
  //         alarmTime: new Date(new Date().setHours(8, 0, 0)),
  //       },
  //       {
  //         id: 2,
  //         task: "양치하기",
  //         completed: true,
  //         hasAlarm: false,
  //       },
  //       {
  //         id: 3,
  //         task: "물 한잔 마시기",
  //         completed: true,
  //         hasAlarm: false,
  //       },
  //     ],
  //   },
  //   lunch: {
  //     title: "점심",
  //     tasks: [
  //       {
  //         id: 4,
  //         task: "유산균 먹기",
  //         completed: false,
  //         hasAlarm: true,
  //         alarmTime: new Date(new Date().setHours(12, 0, 0)),
  //       },
  //     ],
  //   },
  // };

  useEffect(() => {
    // WebSocket 연결 추가
    const socket = new WebSocket("ws://localhost:8000/api/routine_list");

    socket.onopen = () => {
      console.log("✅WebSocket 연결됨");

      const reqData = {
        user_key: "dummy_key_001",
        user_name: "홍길동",
        request_date: new Date().toISOString().slice(0, 10),
      };

      socket.send(JSON.stringify(reqData));
    };

    socket.onmessage = (e) => {
      const raw = JSON.parse(e.data);
      const data = JSON.parse(e.data);
      console.log("루틴 응답 : ", data);
      // 임시 코드
      const parsed = {};
      for (const key in raw) {
        const section = raw[key];
        parsed[key] = {
          ...section,
          tasks: section.tasks.map((task) => ({
            ...task,
            alarmTime: task.alarmTime
              ? (() => {
                  const [h, m, s] = task.alarmTime.split(":");
                  const date = new Date();
                  return new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    h,
                    m,
                    s
                  );
                })()
              : null,
            completed: task.completed ?? false, // undefined 방지
            hasAlarm: task.hasAlarm ?? !!task.alarmTime, // fallback 처리
          })),
        };
      }
      console.log("🟢 파싱된 루틴 데이터:", parsed);
      setRoutineData(parsed);
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
        {Object.entries(routineData).map(([key, timeBlock]) => (
          <React.Fragment key={key}>
            {timeBlock?.tasks?.map((item, index) => (
              <div key={item.task_id} className="routine-row">
                {index === 0 ? (
                  <div className="time-block-title">아침</div>
                ) : (
                  <div className="empty-cell"></div>
                )}
                <div className="task-text">{item.task_name || item.task}</div>
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
          </React.Fragment>
        ))}
      </div>

      <button className="floating-button">+</button>
    </div>
  );
};

export default Main;
