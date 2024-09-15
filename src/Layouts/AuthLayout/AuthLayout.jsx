import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

function AuthLayout() {
  return (
    <div className={styles.page}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src='/logo.svg' alt='Иконка логотипа' />
      </div>
      <div className={styles.formContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
