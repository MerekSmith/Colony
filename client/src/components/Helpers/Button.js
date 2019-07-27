import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";

function Button({ link, isLink, label, extraClass }) {
  const className = `main-btn btn btn-warning btn-lg ${extraClass}`;

  if (isLink) {
    return (
      <div className='m-auto'>
        <Link to={link} className={className}>
          {label}
        </Link>
      </div>
    );
  }
  return (
    <div>
      <a className={className} href={link}>
        {label}
      </a>
    </div>
  );
}

export default Button;
