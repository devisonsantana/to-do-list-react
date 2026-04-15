import Image from "../../assets/spid3r.svg";
import style from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={style.Footer}>
      <p>Copyright &copy; {currentYear}</p>
      <img src={Image} alt="sp1d3r" />
    </footer>
  );
};

export { Footer };
