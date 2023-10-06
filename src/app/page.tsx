"use client";

import Login from "@/components/Login";
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
}
