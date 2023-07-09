import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";
import ContactImg from "public/contact.jpg";

export const metadata = {
  title: "NextEx Contact Information",
  description: "This is Contact Page",
};

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lets Keep in Touch</h1>
      <div className={styles.content}>

        <div className={styles.imgContainer}>
          <Image
            src={ContactImg}
            alt="Contact Img"
            fill={true}
            className={styles.image}
          />
        </div>

        <form className={styles.form}>
          <input id="inputName" type="text" placeholder="name" className={styles.input} />
          <input id="inputEmail" type="text" placeholder="email" className={styles.input} />
          <textarea
            id="inputMsg" 
            className={styles.textArea}
            placeholder="message"
            cols={30}
            rows={10}
          ></textarea>
          <Button url="#" text="Send"/>
        </form>
      </div>
    </div>
  );
};

export default Contact;