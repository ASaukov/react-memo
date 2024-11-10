import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link } from "react-router-dom";
// import { useEasyContext } from "../../context/useContext";
import { useState } from "react";
import { createLeader } from "../../api/Api";

export function EndGameModal({ isWon, isHardMode, gameDurationSeconds, gameDurationMinutes, onClick, achievements }) {
  // const { isEasyMode } = useEasyContext();
  const isLeader = isWon && isHardMode;
  const timeLeader = gameDurationMinutes * 60 + gameDurationSeconds;

  const [error, setError] = useState(null);
  const [leaderName, setLeaderName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  function changeDisable() {
    setIsDisabled(!isDisabled);
  }

  function handleInputChange(e) {
    setLeaderName(e.target.value);
  }

  async function HandleNewLeader() {
    if (leaderName.trim() === "") {
      setError("Введите имя");
      return;
    }
    await createLeader(leaderName, timeLeader, achievements);
    changeDisable();
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      HandleNewLeader();
    }
  }

  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      {!isLeader && <h2 className={styles.title}>{title}</h2>}

      {isLeader && (
        <>
        <div className={styles.leaderText}>
          <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
          <input
            className={styles.placeholder}
            type="text"
            value={leaderName.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Пользователь"
            onKeyDown={onKeyDown}
          />
        </div>
        <button className={styles.buttonLeader} onClick={HandleNewLeader} disabled={isDisabled}>
        Добавить
      </button>
      </>
      )}
      {error && <p className={styles.error}>{error}</p>}

      
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
