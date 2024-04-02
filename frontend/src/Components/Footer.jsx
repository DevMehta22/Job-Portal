import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

const Footer = ()=>{
    return (
        <div>
        <footer className="footer">
        <ul className="social-icon">
          <li className="social-icon__item">
            <Link className="social-icon__link" to="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </Link>
          </li>
          <li className="social-icon__item">
            <Link className="social-icon__link" to="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </Link>
          </li>
          <li className="social-icon__item">
            <Link className="social-icon__link" to="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </Link>
          </li>
          <li className="social-icon__item">
            <Link className="social-icon__link" to="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </Link>
          </li>
        </ul>
        <ul className="menu">
          <li className="menu__item">
            <Link className="menu__link" to="#">
              Services
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="#">
              Team
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="#">
              Contact
            </Link>
          </li>
        </ul>
        <p>&copy;2024 Job Portal | All Rights Reserved</p>
      </footer>
        </div>
    )
}

export default Footer