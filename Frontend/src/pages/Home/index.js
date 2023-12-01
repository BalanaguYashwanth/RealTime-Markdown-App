import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import io from "socket.io-client";
import { BACKEND_ENDPOINT } from "../../utils/constant";

const socket = io(BACKEND_ENDPOINT);

const Home = () => {
  const [htmlContents, setHTMLContents] = useState("");
  
  const handleTextChange = (e) => {
    socket.emit("convertHTML", e.target.value);
    socket.on("HTMLContents", (contents) => {
      setHTMLContents(contents);
    });
  };

  useEffect(() => {
    socket.on("connection", () => {
      console.log("socket is connected");
    });
  }, []);

  return (
    <main className={styles.container}>
      <h2 className={styles.textCenter}>Markdown Convertor</h2>
      <section className={styles.flex}>
        <textarea
          className={styles.box}
          onChange={handleTextChange}
        ></textarea>
        <div
          className={styles.box}
          dangerouslySetInnerHTML={{ __html: htmlContents }}
        />
      </section>
    </main>
  );
};

export default Home;
