import HeaderButton from "./Button";
import HeaderTitle from "./Title";

export default function Header({
  title,
  buttonTo1,
  buttonTo2,
  buttonTitle1,
  buttonTitle2,
}) {
  return (
    <div>
      <HeaderTitle title={title} />
      <div>
        <HeaderButton to={buttonTo1} title={buttonTitle1} />
        <HeaderButton to={buttonTo2} title={buttonTitle2} />
      </div>
    </div>
  );
}
