import React from "react";
import Link from "next/link";

import SigninButton from "./SigninButton";
import styles from "./appbar.module.scss";
import Colors from "@/constants/colors";

const App = () => {

    return (
        <header className={styles.appbar} style={{ background: Colors.whiteColor }}>
            <div className={styles.logo} style={{ color: Colors.primaryColor }}>
                <Link href={"/"}>
                    SMARTFOLIO
                </Link>
            </div>
            <nav className={styles.navbar}>
                <SigninButton/>
            </nav>
        </header>
    );
};

export default App;
