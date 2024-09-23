import { useState } from "react";
import { getLeadersPage } from "../../api/Api";
import { Button } from "../../components/Button/Button";
import styles from "./Leaderboard.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




export function Leaderboard() {
 const [leaderArr, setLeaderArr] = useState([]);
 const [error, setError] = useState(null);
 const navigate = useNavigate();

 function StartGame() {
navigate("/game/9")
 }

 useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getLeadersPage();
      const filterData = data
      .sort((a, b) => a.time - b.time)
      .slice(0, 10);
      setLeaderArr(filterData);
    } catch (error) {
      setError("Не удалось загрузить данные");
    }
  }
  fetchData();
 }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Лидерборд</p>
        <Button onClick={StartGame}>Начать игру</Button>
      </div>
      <div className={styles.table}>
        <div className={styles.contentTitle}>
          <p className={styles.positionTitle}>Позиция</p>
          <p className={styles.nameTitle}>Пользователь</p>
          <p className={styles.reserveTitle}></p>
          <p className={styles.timeTitle}>Время</p>
        </div>
        {leaderArr.map((leader, index) => (
          <div key={leader.id} className={styles.contentLeaders}>
          <p className={styles.positionTitle}># {index + 1}</p>
          <p className={styles.nameTitle}>{leader.name}</p>
          <p className={styles.reserveTitle}></p>
          <p className={styles.timeTitle}>{`${Math.floor(leader.time / 60).toString().padStart(2, 0)}:${(leader.time % 60).toString().padStart(2, 0)}`}</p>
        </div>
        ))}
        {error}
      </div>
    </div>
  );
}
