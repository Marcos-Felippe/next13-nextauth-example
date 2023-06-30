"use client";

import styles from "./page.module.css";
import useSWR, { Fetcher } from "swr";
import Image from "next/image";
import Hero from "public/hero.jpg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {

    // Pegando a session de autenticação
    const session = useSession();

    const router = useRouter();


    // OLD WAY TO FETCH DATA
    /*const [data, setData] = useState([]);
     const [err, setErr] = useState(false);
     const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await fetch("https:jsonplaceholder.typicode.com/posts", {
                cache: "no-store",
            });

            if (!res.ok) {
                setErr(true);
            }

            const data = await res.json()

            setData(data);
            setIsLoading(false);
        };
        getData()
    }, []);*/

    // NEW WAY TO FETCH DATA
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, mutate, error, isLoading } = useSWR(
        `https:jsonplaceholder.typicode.com/users/${1}/posts`, // `/api/posts?username=${session?.data?.user.name}`,
        fetcher
    );


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const title = e.target[0].value;
        const desc = e.target[1].value;
        const img = e.target[2].value;
        const content = e.target[3].value;
    
        try {
            /* await fetch("/api/posts", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    desc,
                    img,
                    content,
                    username: session.data.user.username,
                }),
            });

            mutate();
            */

            e.target.reset();
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleDelete = async (id: any) => {
        try {
            // codigo de deleção de um post no banco...

            // mutate();
        } catch (err) {
            console.log(err);
        }
    }


    // Verificando o status da session de autenticação e tomando as devidas providências
    if (session.status === "loading") {
        return <p>Loading. . .</p>;
    }
    
    if (session.status === "unauthenticated") {
        router?.push("/dashboard/login");
    }

    if (session.status === "authenticated") {
        return(
            <div className={styles.container}>
                <div className={styles.posts}>
                    {isLoading
                        ? "loading. . ."
                        : data?.map((post: any) => (
                            <div className={styles.post} key={post._id}>
                                <div className={styles.imgContainer}>
                                    <Image src={Hero} alt="" width={200} height={100} />
                                </div>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <span
                                    className={styles.delete}
                                    onClick={() => handleDelete(post._id)}
                                >
                                    X
                                </span>
                            </div>
                    ))}
                </div>

                <form className={styles.new} onSubmit = { handleSubmit }>
                    <h1>Add New Post</h1>
                    <input type="text" placeholder="Title" className={styles.input} />
                    <input type="text" placeholder="Desc" className={styles.input} />
                    <input type="text" placeholder="Image" className={styles.input} />
                    <textarea
                        placeholder="Content"
                        className={styles.textArea}
                        cols={30}
                        rows={10}
                    ></textarea>
                    <button className={styles.button}>Send</button>
                </form>
            </div>
        );
    }
}

export default Dashboard;