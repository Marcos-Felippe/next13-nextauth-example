import React from "react";
import styles from "./button.module.css";
import Link from "next/link";

const Button = ({ text, url }) => {
  return (
    <div className={styles.container}>
      <Link href={url}>
        <button className={styles.button}>{text}</button>
      </Link>
    </div>
    
  );
};

export default Button;