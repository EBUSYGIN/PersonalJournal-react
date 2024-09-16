import { useForm } from 'react-hook-form';
import styles from '../LoginForm/LoginForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { registerUser } from '../../Redux/user.slice';
import { emailValidation } from '../../utils/emailValidation';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ reValidateMode: 'onSubmit' });
  const dispatch = useDispatch();
  const { jwt, registerState } = useSelector((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) navigate('/');
  }, [jwt, navigate]);

  const submit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <h1>Регистрация</h1>
      <label className={styles.label}>
        Ваш email
        <input
          className={styles.input}
          placeholder='Ваш email'
          {...register('email', {
            required: 'Поле обязательно для заполнения',
            validate: emailValidation
          })}
        />
      </label>
      <label className={styles.label}>
        Ваш пароль
        <input
          className={styles.input}
          placeholder='Ваш пароль'
          {...register('password', {
            required: 'Поле обязательно для заполнения'
          })}
        />
      </label>
      <label className={styles.label}>
        Ваше имя
        <input
          className={styles.input}
          placeholder='Ваше имя'
          {...register('name', { required: 'Поле обязательно для заполнения' })}
        />
      </label>
      <div className={styles.errors}>
        {errors.email
          ? errors.email.message
          : errors.password
          ? errors.password.message
          : errors.name
          ? errors.name.message
          : registerState
          ? registerState
          : ''}
      </div>
      <button className={styles.button}>Зарегистрироваться</button>
      <div className={styles.link}>
        <div>Есть аккаунт?</div>
        <NavLink to={'/auth/login'}>Войти</NavLink>
      </div>
    </form>
  );
}

export default RegisterForm;
