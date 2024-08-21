import { Button } from "../../components/Button/Button";
import styles from "./Leaderboard.module.css"

export function Leaderboard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Лидерборд</p>
        <Button >Начать игру</Button>
      </div>
    </div>
  );
}
