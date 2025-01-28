import { getYear } from "../hooks/ReservationHooks";

const Footer = () => {
  return (
    <footer className="w-full">
      <nav className="flex justify-between w-full">
        <ul className="flex justify-between w-10">
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://twitter.com/choir241"
              className="fa-brands fa-twitter"
            >
              <p className="hidden">Twitter</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/richard-choir/"
              className="fa-brands fa-linkedin"
            >
              <p className="hidden">LinkedIn</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/225kh_drw/?hl=en"
              className="fa-brands fa-instagram"
            >
              <p className="hidden">Instagram</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/choir27"
              className="fa-brands fa-github"
            >
              <p className="hidden">Github</p>
            </a>
          </li>
        </ul>

        <small>AutoAligners &copy; {getYear()}. All rights are reserved</small>
      </nav>
    </footer>
  );
};

export default Footer;
