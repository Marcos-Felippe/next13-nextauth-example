"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {

    const session = useSession();

    const links = [
        {
            "id": 1,
            "title": "Home",
            "url": "/"
        },
        {
            "id": 2,
            "title": "Portfolio",
            "url": "/portfolio"
        },
        {
            "id": 3,
            "title": "Blog",
            "url": "/blog"
        },
        {
            "id": 4,
            "title": "About",
            "url": "/about"
        },
        {
            "id": 5,
            "title": "Contact",
            "url": "/contact"
        },
        {
            "id": 6,
            "title": "Dashboard",
            "url": "/dashboard"
        },
    ];

    return (
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>NextEx</Link>
        <div className={styles.links}>
            <DarkModeToggle />
            
            {links.map((link) => (
                <Link key={link.id} href={link.url} className={styles.link}>
                    {link.title}
                </Link>
            ))}
        </div>
        
        {session.status === "authenticated" && (
            <button className={styles.logout} onClick = { () => {
                // Chamando a função de singOut da session
                signOut();
            } }>
                Logout
            </button>
        )}
      </div>
    )
  }
  