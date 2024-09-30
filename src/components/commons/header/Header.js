import HeaderButton from "./Button";
import HeaderTitle from "./Title";
import "../../../style/header.css";

export default function Header({
  title,
  buttonTo1,
  buttonTo2,
  buttonTitle1,
  buttonTitle2,
}) {
  return (
    <div className="header">
      <HeaderTitle title={title} />
      <div className="headerButtonList">
        <HeaderButton to={buttonTo1} title={buttonTitle1} />
        <HeaderButton to={buttonTo2} title={buttonTitle2} />
      </div>
    </div>
  );
}
