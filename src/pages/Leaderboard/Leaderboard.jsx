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
    navigate("/game/9");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeadersPage();
        let filterData = data.sort((a, b) => a.time - b.time).slice(0, 10);
        setLeaderArr(filterData);
      } catch (error) {
        setError("Не удалось загрузить данные");
      }
    };
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
          <p className={styles.achievementsTitle}>Достижения</p>
          <p className={styles.timeTitle}>Время</p>
        </div>
        {leaderArr.map((leader, index) => (
          <div key={leader.id} className={styles.contentLeaders}>
            <p className={styles.positionTitle}># {index + 1}</p>
            <p className={styles.nameTitle}>{leader.name}</p>
            <div className={styles.achievementsTitle}>
              {leader.achievements.includes(1) ? (
                <div className={styles.boxBonus}>
                  <img className={styles.iconBonus} src="bonusactiv.svg" alt="active" />
                  <div className={styles.boxTitle1}>
                    <p className={styles.bonusTitle}>Игра пройдена в сложном режиме</p>
                    <img className={styles.arrow} src="polygon.svg" alt="" />
                  </div>
                </div>
              ) : (
                <img className={styles.iconBonus} src="bonus1.png" alt="bonus" />
              )}
              {leader.achievements.includes(2) ? (
                <div className={styles.boxBonus}>
                <img className={styles.iconBonus} src="magicballactiv.svg" alt="ballactive" />
                <div className={styles.boxTitle2}>
                    <p className={styles.bonusTitle}>Игра пройдена без супер-сил</p>
                    <img className={styles.arrow} src="polygon.svg" alt="" />
                  </div>
                </div>
              ) : (
                <img className={styles.iconBonus} src="magicball.svg" alt="bonus" />
              )}
            </div>
            <p className={styles.timeTitle}>{`${Math.floor(leader.time / 60)
              .toString()
              .padStart(2, 0)}:${(leader.time % 60).toString().padStart(2, 0)}`}</p>
          </div>
        ))}
        {error}
      </div>
    </div>
  );
}
