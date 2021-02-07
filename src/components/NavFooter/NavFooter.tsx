import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavFooter.module.css"

// TODO: Turn this into a reusable package, so I can just import it for each project.
// Maybe use {...children} so I can add whatever links I want to it.

export const NavFooter = () => {
  return <footer className={styles.NavFooter}>
    &copy; {new Date().getFullYear()} Copyright: Raymond Price
    <Link to="https://github.com/darthbob88/">Github</Link>
    <Link to="https://github.com/darthbob88/reveal-clues-quiz">Github Repo for this Project</Link>
    <Link to="https://twitter.com/darthbob88">Twitter</Link>
    <Link to="https://www.linkedin.com/in/raymond-price-10a3746b/">Linkedin</Link>
  </footer>
};