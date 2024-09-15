import styles from './LoginForm.module.css';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, userAction } from '../../Redux/user.slice';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = useSelector((s) => s.user.jwt);

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
            minLength: {
              value: 5,
              message: 'Email минимум 5 символов'
            }
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
              message: 'Пароль минимум 3 символа'
            }
          })}
          className={styles.input}
          placeholder='Ваш пароль'
        />
      </label>
      <div className={styles.errors}>
        {errors.password?.message && `${errors.password?.message}`}
        {errors.email?.message && `${errors.email?.message}`}
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
