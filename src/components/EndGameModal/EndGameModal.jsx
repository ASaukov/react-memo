import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link } from "react-router-dom";
import { useEasyContext } from "../../context/useContext";
import { useState } from "react";
import { getLeader } from "../../api/Api";

export function EndGameModal({ isWon, isHardMode, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { isEasyMode } = useEasyContext();
  const isLeader = isWon && isHardMode && !isEasyMode;
  const timeLeader = gameDurationMinutes * 60 + gameDurationSeconds;

  const [error, setError] = useState(null);
  const [leaderData, setLeaderData] = useState({
    name: "",
    time: timeLeader,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setLeaderData({
      ...leaderData,
      [name]: value,
    });
  }

  async function HandleNewLeader(e) {
    e.preventDefault();
    if (leaderData.name.trim() === "") {
      setError("Введите имя");
      return;
    }
    await getLeader({leaderData});
  }

  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      {!isLeader && <h2 className={styles.title}>{title}</h2>}

      {isLeader && (
        <div className={styles.leaderText}>
          <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
          <input
            className={styles.placeholder}
            type="text"
            value={leaderData.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Пользователь"
          />
        </div>
      )}
      <p className={styles.error}>{error}</p>
      <button onClick={HandleNewLeader}>Отправить</button>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>
      <Button onClick={onClick}>Играть снова</Button>
      {isLeader && (
        <Link className={styles.toLeaderboard} to="/leaderboard">
          Перейти к лидерборду
        </Link>
      )}
    </div>
  );
}
