import Header from './components/Header/Header';
import SubMenu from './components/SubMenu/SubMenu';
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.up}></div>
        <div className={styles.down}></div>
      </div>
      <div className={styles.content}>
        <Header />
        <SubMenu/>
      </div>
    </div>
  );
}
