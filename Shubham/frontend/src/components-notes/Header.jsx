import React from "react";
function Header(props) {
  const signOut = () => {
    props.setUser(false);
  };

  return (
    <header>
      <h1>Keeper</h1>
      <a href="/login" className="signout" onClick={signOut}>
        Signout
      </a>
    </header>
  );
}

export default Header;
