import React from 'react';
import { IconStatBtn } from '../../../icons/iconStatBtn';
import styles from './buttonStat.css';

export function ButtonStat() {
  return (
    <button className={styles.btn}>
      <IconStatBtn />
    </button>
  );
}
