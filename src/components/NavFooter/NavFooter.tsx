import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavFooter.module.css"

export const NavFooter = () => {
  return <footer className={styles.NavFooter}>
    &copy; {new Date().getFullYear()} Copyright: Raymond Price
    <Link to={"https://github.com/darthbob88/"}>Github</Link>
    <Link to="https://twitter.com/darthbob88">Twitter</Link>
    <Link to="https://www.linkedin.com/in/raymond-price-10a3746b/">Linkedin</Link>
  </footer>
};