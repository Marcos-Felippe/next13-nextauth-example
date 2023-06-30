import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Hero from "public/hero.jpg";


type Post = {
    id: string,
    username: string,
    title: string,
    description: string,
    body: string,
}


// fazendo uma request que será chamada do lado do servidor - SSR
async function getData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        next: { revalidate: 10000 }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}


const Blog = async () => {

    const data: Post[] = await getData();

    return (
        <div className={styles.mainContainer}>
            {data.map((post: Post) => (
                <Link href={`/blog/${post.id}`} className={styles.container} key={post.id}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={Hero}
                            alt=""
                            width={400}
                            height={250}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>{post.title}</h1>
                        <p className={styles.desc}>{post.body}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Blog;