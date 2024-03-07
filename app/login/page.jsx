"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });

    router.refresh();
    setUser(res.data.user);
    setEmail("");
    setPassword("");
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({ email, password });
    setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  if (loading) {
    return <h1>loading..</h1>;
  }

  if (user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
            You're already logged in
          </h1>
          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <form className={styles.loginForm}>
        <div className={styles.loginForm_form_item}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className={styles.loginForm_form_item}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <div className={styles.loginForm_form_btn}>
          <button
            className={styles.loginForm_form_btn_signUp}
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className={styles.loginForm_form_btn_signIn}
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </form>
    </main>
  );
}
