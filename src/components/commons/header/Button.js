import { Link } from "react-router-dom";

export default function HeaderButton({ to, title }) {
  return (
    <Link to={to} className="headerButton">
      {title}
      <img className="arrowIcon" src="/imgs/arrowIcon.png" alt="화살표" />
    </Link>
  );
}
