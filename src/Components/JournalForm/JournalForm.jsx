import { useEffect, useReducer, useRef, useContext } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ addItem, selectedItem }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, submit } = formState;
  const { userId } = useContext(UserContext);

  const titleRef = useRef();
  const dateRef = useRef();
  const tagRef = useRef();
  const textRef = useRef();

  const focus = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.tag:
        tagRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    dispatchForm({ type: 'SET_INPUT', payload: { ...selectedItem } });
  }, [selectedItem]);

  useEffect(() => {
    dispatchForm({ type: 'SET_INPUT', payload: { userId } });
  }, [userId]);

  useEffect(() => {
    let timeoutId;
    if (!isValid.title || !isValid.date || !isValid.text || !isValid.tag) {
      focus(isValid);
      timeoutId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isValid]);

  useEffect(() => {
    if (submit) {
      addItem(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_INPUT', payload: { userId } });
    }
  }, [submit, addItem, values, userId]);

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  const onChange = (event) => {
    dispatchForm({
      type: 'SET_INPUT',
      payload: { [event.target.name]: event.target.value }
    });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={styles['input-container']}>
        <div>{userId}</div>
        <Input
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          type='text'
          name='title'
          appereance='title'
          isValid={isValid.title}
        />
        <button className={styles['delete-container']}>
          <img src='./delete.svg' alt='Иконка удаления' />
        </button>
      </div>
      <div className={styles['input-container']}>
        <label htmlFor='date' className={styles.label}>
          <img src='./calendar.svg' alt='Иконка календаря' />
          <span>Дата</span>
        </label>
        <Input
          ref={dateRef}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
          }
          onChange={onChange}
          id='date'
          type='date'
          name='date'
          isValid={isValid.date}
        />
      </div>

      <div className={styles['input-container']}>
        <label htmlFor='tag' className={styles.label}>
          <img src='./folder.svg' alt='Иконка папки' />
          <span>Метки</span>
        </label>
        <Input
          ref={tagRef}
          value={values.tag}
          onChange={onChange}
          type='text'
          name='tag'
          id='tag'
          isValid={isValid.tag}
        />
      </div>

      <textarea
        ref={textRef}
        value={values.text}
        onChange={onChange}
        name='text'
        id=''
        cols='30'
        rows='10'
        className={cn(styles.input, {
          [styles.invalid]: !isValid.text
        })}
      />
      <Button text={'Сохранить'} />
    </form>
  );
}

export default JournalForm;
