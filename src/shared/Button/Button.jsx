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
    case 'delete':
      return (
        <button
          className={styles.btn_delete}
          onClick={action}
          disabled={disabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#992B15"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
          <span>{text}</span>
        </button>
      );
  }
  return (
    <button className={styles.btn_default} onClick={action} disabled={disabled}>
      {text}
    </button>
  );
};
