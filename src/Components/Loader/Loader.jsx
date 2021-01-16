import React from "react";
import { motion } from "framer-motion";
import styles from "./Loader.module.scss";
function Loader() {
  return (
    <motion.figure
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      className={styles.loader}
    >
      Loading Articles...
    </motion.figure>
  );
}

export default Loader;
