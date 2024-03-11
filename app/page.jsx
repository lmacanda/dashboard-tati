import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <div>
        <div className={styles.home_header}>
          <Link href="/wine-list">dashboard</Link>
          <Link href="/wine-menu">Wine-Menu</Link>
        </div>
        <h1>Tati</h1>
      </div>
    </div>
  );
}
