import React from "react";

function HeaderTitle({ title }) {
  return (
    <div className="headerTitle">
      {title}
      <span>의 개발공장</span>
    </div>
  );
}

export default HeaderTitle;
