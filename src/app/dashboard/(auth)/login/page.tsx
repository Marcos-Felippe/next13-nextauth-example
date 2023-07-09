"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";


const Login = ({ url }: any) => {

    const session = useSession();
    const router = useRouter();

    const params = useSearchParams();
    const [error, setError] = useState<string | null>("");
    const [success, setSuccess] = useState<string | null>("");

    useEffect(() => {
        setError(params.get("error"));
        setSuccess(params.get("success"));
    }, [params]);

    // Verificando o status da session de autenticação e tomando as devidas providências, caso o usuario tenha autenticado anteriormente
    if (session.status === "loading") {
        return <p>Loading. . .</p>;
    }

    if (session.status === "authenticated") {
        router?.push("/dashboard");
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        // Chamando a autenticação por meio de credenciais
        signIn("credentials", {
            email,
            password,
        });
    };


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
            <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

            <form onSubmit = { handleSubmit } className = {styles.form}>
                <input
                    id="inputEmail"
                    type="text"
                    placeholder="Email"
                    required
                    className={styles.input}
                />
                <input
                    id="inputPassword" 
                    type="password"
                    placeholder="Password"
                    required
                    className={styles.input}
                />
                <button className={styles.button}>Login</button>
                {error && error}
            </form>

            <button
                onClick={() => {
                    // Chamando a autenticação por conta do google
                    signIn("google");
                }}
                className={styles.button + " " + styles.google}
            >
                Login with Google
            </button>

            <span className={styles.or}>- OR -</span>
            <Link className={styles.link} href="/dashboard/register">
                Create new account
            </Link>
            {/* <button
                onClick={() => {
                    signIn("github");
                }}
                className={styles.button + " " + styles.github}
            >
                Login with Github
            </button> */}
        </div>
    );
};

export default Login;