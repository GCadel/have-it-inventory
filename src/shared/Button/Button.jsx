import { Link } from 'react-router';
import styles from './Button.module.css';

export const Button = ({ buttonType, text, action, disabled = false }) => {
  switch (buttonType) {
    case 'primary':
      return (
        <button
          className={styles.btn_primary}
          onClick={action}
          disabled={disabled}
        >
          {text}
        </button>
      );
    case 'secondary':
      return (
        <button
          className={styles.btn_secondary}
          onClick={action}
          disabled={disabled}
        >
          {text}
        </button>
      );
  }
  return (
    <button className={styles.btn_default} onClick={action} disabled={disabled}>
      {text}
    </button>
  );
};
