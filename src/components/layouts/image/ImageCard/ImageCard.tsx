import React from "react";
import styles from "./ImageCard.module.scss";
import image from "../../../../assets/fff.png";

export const ImageCard = () => {
  return (
    <div className={styles.imageContainer}>
      <img src={image} alt="image" />
    </div>
  );
};
