import styles from "./page.module.css";
import Hero from "public/hero.jpg";
import Image from "next/image";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Creating the best web apps the easy way.
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Button text="See Our Works" url="/portfolio"/>
      </div>
      <div className={styles.item}>
        <Image src={Hero} alt="Home Hero" className={styles.img} />
      </div>
    </div>
  )
}
