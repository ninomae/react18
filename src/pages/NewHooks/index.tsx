import React from "react";
const NewHooks: React.VFC = (_) => {
  const id = React.useId();
  const id2 = React.useId();
  return (
    <>
      <div id={id}>useId{id}</div>
      <div id={id2}>useId2{id2}</div>
    </>
  );
};
export default NewHooks;
