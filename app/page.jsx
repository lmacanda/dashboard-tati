import styles from "./page.module.css";
import AuthForm from "./components/authForm/AuthForm";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Tati</h1>
        <AuthForm />
      </div>
    </div>
  );
}
