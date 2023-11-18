import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useOutletContext } from "react-router-dom";

function Chats() {
  const { setSearchFocus } = useOutletContext();

  function handleClick() {
    setSearchFocus(true);
  };

  return (
    <aside className="aside-chats">
      <div className="aside-title">
        <h3>Chats</h3>
        <PencilSquareIcon className="icon" onClick={handleClick}/>
      </div>
    </aside>
  );
}

export default Chats;
