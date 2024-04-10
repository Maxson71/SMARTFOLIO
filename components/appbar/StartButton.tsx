"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";

import styles from "../button.module.scss";
import Link from "next/link";

const StartButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <>
                <Link href={"/portfolio"} className={styles.startbutton}>
                    ПЕРЕЙТИ ДО ПОРТФЕЛЮ
                </Link>
            </>
        );
    }
    return (
        <button onClick={() => signIn()} className={styles.signInbutton}>
            РОЗПОЧАТИ
        </button>
    );
};

export default StartButton;