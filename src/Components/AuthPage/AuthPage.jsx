import LoginForm from '../LoginForm/LoginForm';
import styles from './AuthPage.module.css';

function AuthPage() {
  return (
    <div className={styles.page}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src='/logo.svg' alt='Иконка логотипа' />
      </div>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
}

export default AuthPage;
