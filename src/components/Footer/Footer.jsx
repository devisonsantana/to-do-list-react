import Image from "../../assets/spid3r.svg";
import style from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={style.Footer}>
      <div className={style.Copy}>
        <p>Copyright &copy; {currentYear}</p>
        <img src={Image} alt="sp1d3r" />
      </div>
      <div className={style.Container}>
        <div className={style.Container__Tech}>
          <p>
            Desenvolvido com <span>React</span> & <span>ASP.NET</span>
          </p>
        </div>
        <div className={style.Container__Host}>
          <p>
            Front-end hospedado na{" "}
            <a href="https://vercel.com/" target="_blank">
              Vercel
            </a>
          </p>
          <p>
            Back-end ASP.NET hospedado no{" "}
            <a href="https://render.com/" target="_blank">
              Render
            </a>
          </p>
          <p>
            Banco de dados{" "}
            <a href="https://mongodb.com/" target="_blank">
              MongoDb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
