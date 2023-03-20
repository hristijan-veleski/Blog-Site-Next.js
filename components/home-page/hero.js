import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/hero.jpeg"
          alt="The greatest hero of all time"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, i am Inotep</h1>
      <p>
        I want to be a mummy, i dont know havent payed attention to the movie
        who cares
      </p>
    </section>
  );
}

export default Hero;
