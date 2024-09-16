import styles from './LoginForm.module.css';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, userAction } from '../../Redux/user.slice';
import { emailValidation } from '../../utils/emailValidation';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwt, loginState } = useSelector((s) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ reValidateMode: 'onSubmit' });

  const submit = (data) => {
    dispatch(userAction.removeJwt());
    dispatch(login(data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <h1>Вход</h1>
      <label className={styles.label}>
        Ваш email
        <input
          {...register('email', {
            required: 'Поле обязятельно к заполнению',
            validate: emailValidation
          })}
          className={styles.input}
          placeholder='Ваш email'
        />
      </label>
      <label className={styles.label}>
        Ваш пароль
        <input
          {...register('password', {
            required: 'Поле обязятельно к заполнению',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа'
            }
          })}
          className={styles.input}
          placeholder='Ваш пароль'
        />
      </label>
      <div className={styles.errors}>
        {errors.email
          ? errors.email.message
          : errors.password
          ? errors.password.message
          : loginState
          ? loginState
          : ''}
      </div>
      <button className={styles.button}>Вход</button>
      <div className={styles.link}>
        <div>Нет аккаунта?</div>
        <NavLink to={'/auth/register'}>Зарегистрироваться</NavLink>
      </div>
    </form>
  );
}

export default LoginForm;
