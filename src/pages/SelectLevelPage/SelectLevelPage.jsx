import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useEasyContext } from "../../context/useContext";
import { Button } from "../../components/Button/Button";

export function SelectLevelPage() {
  const {isEasyMode, setEasyMode} = useEasyContext();
  
  return ( 
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <div className={styles.modeSelection}>
        <label className={styles.nameMode}>
        <input className={styles.checkbox} type="checkbox" checked={isEasyMode} onChange={e => setEasyMode(e.target.checked)}/>
        <span className={styles.customCheckbox}></span>
        Легкий режим (3 жизни)
        </label>
        </div>
        <Button >Играть</Button>
        <Link className={styles.toLeaderboard}>Перейти к лидерборду</Link>
      </div>
    </div>
  );
}
