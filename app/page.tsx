import styles from "./mainpage.module.scss";
import StartButton from "@/components/StartButton";
export default function Home() {
  return (
    <main className={styles.main}>
        <div style={{
            backgroundImage: "url(/images/main-image.png)",
            width: "100%",
            height: "calc(100vh - 64px)",
            flexGrow: 1,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className={styles.container}
                style={{
                background: "rgba(17, 51, 117, 0.5)",
                width: "100%",
                height: "100%",
            }}>
                <div className={styles.info}>
                    <h1 className={styles.title}
                        style={{
                        color: "white"
                    }}>
                        SMARTFOLIO
                    </h1>
                    <p className={styles.description} style={{
                        color: "white",
                        maxWidth: "470px"
                    }}>
                        Отримайте повний контроль над своїми інвестиціями з нашою платформою
                    </p>
                    <div className={styles.startbutton}>
                        <StartButton />
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
