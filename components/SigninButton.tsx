"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "./button.module.scss";
const SigninButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <>
                <img src={session.user.image} alt={session.user.name} style={{
                    height: "32px",
                    borderRadius: "16px"
                }}
                />
                <button onClick={() => signOut()} className={styles.signOutbutton}>
                    ВИЙТИ
                </button>
            </>
        );
    }
    return (
        <button onClick={() => signIn()} className={styles.signInbutton}>
            ЗАРЕЄСТРУВАТИСЬ
        </button>
    );
};

export default SigninButton;