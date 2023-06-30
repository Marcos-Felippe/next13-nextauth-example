import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import Hero from "public/hero.jpg";


type MetadataParams = {
    params: {
        id: string;
        title: string;
        description: string;
    }
}


type BlogPostParams = {
    params: {
        id: string;
    }
}

type Post = {
    id: string,
    username: string,
    title: string,
    description: string,
    body: string,
}


// fazendo uma request que será chamada do lado do servidor - SSR
async function getData(id: any) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        next: { revalidate: 10000 }
    });

    if (!res.ok) {
        return notFound();
    }

    return res.json();
}


// metadata utilizada para SEO
export async function generateMetadata({ params }: MetadataParams) {

    const post: Post = await getData(params.id);
    return {
        title: post.title,
        description: post.body,
    };
}


const BlogPost = async ({ params }: BlogPostParams) => {

    const data: Post = await getData(params.id);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <h1 className={styles.title}>{data.title}</h1>
                    <p className={styles.desc}>
                        {data.body}
                    </p>
                    <div className={styles.author}>
                        <Image
                            src={Hero}
                            alt=""
                            width={40}
                            height={40}
                            className={styles.avatar}
                        />
                        <span className={styles.username}>{data.username}</span>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src={Hero}
                        alt=""
                        fill={true}
                        className={styles.image}
                    />
                </div>
            </div>
            
            <div className={styles.content}>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet. Ea praesentium quasi aut sapiente eligendi aut iure voluptates. Est fugiat rerum non odio dolores aut voluptas nisi nam iste tenetur eos quod quos et illum asperiores aut perspiciatis voluptatem? Et aliquam accusamus non internos omnis et nihil omnis in quas dolores aut Quis eveniet. Aut obcaecati accusantium et error maxime et natus nesciunt.
                    Ut sunt neque sed tempore voluptatum nam doloremque impedit et fugit quae qui dolor assumenda. Sit maxime molestiae sed rerum numquam et ipsam rerum eos quae quia. Nam exercitationem sint qui tempore tempore eum illo veniam nam sint dolor in soluta possimus.
                    Cum quidem voluptatem est exercitationem ullam et dignissimos velit qui perferendis aperiam qui maiores veritatis ut adipisci sint aut magni amet. Et aspernatur sequi rem expedita sunt eos ducimus consequatur et debitis rerum ea tempora eligendi et doloremque voluptate sed laudantium delectus.
                    <br /><br />
                    Lorem ipsum dolor sit amet. Ea praesentium quasi aut sapiente eligendi aut iure voluptates. Est fugiat rerum non odio dolores aut voluptas nisi nam iste tenetur eos quod quos et illum asperiores aut perspiciatis voluptatem? Et aliquam accusamus non internos omnis et nihil omnis in quas dolores aut Quis eveniet. Aut obcaecati accusantium et error maxime et natus nesciunt.
                    Ut sunt neque sed tempore voluptatum nam doloremque impedit et fugit quae qui dolor assumenda. Sit maxime molestiae sed rerum numquam et ipsam rerum eos quae quia. Nam exercitationem sint qui tempore tempore eum illo veniam nam sint dolor in soluta possimus.
                    Cum quidem voluptatem est exercitationem ullam et dignissimos velit qui perferendis aperiam qui maiores veritatis ut adipisci sint aut magni amet. Et aspernatur sequi rem expedita sunt eos ducimus consequatur et debitis rerum ea tempora eligendi et doloremque voluptate sed laudantium delectus.
                </p>
            </div>
        </div>
    );
};

export default BlogPost;