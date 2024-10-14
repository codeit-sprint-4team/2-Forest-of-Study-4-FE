import Gnb from "../components/commons/gnb/Gnb";
import Header from "../components/commons/header/Header";

export default function Test() {
  return (
    <div>
      <Gnb />
      <Header
        title="title"
        buttonTo1=""
        buttonTo2=""
        buttonTitle1="title1"
        buttonTitle2="title2"
      />
    </div>
  );
}
