import { Link } from "react-router-dom";

export default function HeaderButton({ to, title }) {
  return <Link to={to}>{title}</Link>;
}
