import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useEasyContext } from "../../context/useContext";
import { Button } from "../../components/Button/Button";
import { useState } from "react";

export function SelectLevelPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { isEasyMode, setEasyMode } = useEasyContext();

  const [level, setLevel] = useState(null);

  function ChengeLevel(e) {
    setLevel(e.target.value);
  }

  function StartGame() {
    if (!level) {
      setError("Выбери уровень сложности");
      return;
    }
    navigate(level);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <input
              className={styles.levelButton}
              type="radio"
              name="level"
              id="1"
              value="/game/3"
              onChange={ChengeLevel}
              checked={level === "/game/3"}
            />
            <label className={styles.levelLink} htmlFor="1">
              1
            </label>
          </li>
          <li className={styles.level}>
            <input
              className={styles.levelButton}
              type="radio"
              name="level"
              id="2"
              value="/game/6"
              onChange={ChengeLevel}
              checked={level === "/game/6"}
            />
            <label className={styles.levelLink} htmlFor="2">
              2
            </label>
          </li>
          <li className={styles.level}>
            <input
              className={styles.levelButton}
              type="radio"
              name="level"
              id="3"
              value="/game/9"
              onChange={ChengeLevel}
              checked={level === "/game/9"}
            />
            <label className={styles.levelLink} htmlFor="3">
              3
            </label>
          </li>
        </ul>
        <div className={styles.modeSelection}>
          <label className={styles.nameMode}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={isEasyMode}
              onChange={e => setEasyMode(e.target.checked)}
            />
            <span className={styles.customCheckbox}></span>
            Легкий режим (3 жизни)
          </label>
        </div>
        <p className={styles.error}>{error}</p>
        <Button onClick={StartGame}>Играть</Button>
        <Link className={styles.toLeaderboard} to="/leaderboard">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
