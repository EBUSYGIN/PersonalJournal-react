import { useEffect, useReducer } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({ addItem }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, submit } = formState;

  useEffect(() => {
    let timeoutId;
    if (!isValid.title || !isValid.date || !isValid.text || !isValid.tag) {
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
    }
  }, [submit]);

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: 'SUBMIT', payload: formProps });
  };

  const onChange = (event) => {
    dispatchForm({
      type: 'SET_INPUT',
      payload: { [event.target.name]: [event.target.value] }
    });
    // console.log(e.target.name);
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          onChange={onChange}
          value={values.title}
          type='text'
          name='title'
          className={cn(styles['input-title'], {
            [styles.invalid]: !isValid.title
          })}
        />
      </div>
      <div className={styles['input-container']}>
        <label htmlFor='date' className={styles.label}>
          <img src='./calendar.svg' alt='Иконка календаря' />
          <span>Дата</span>
        </label>
        <input
          value={values.date}
          onChange={onChange}
          id='date'
          type='date'
          name='date'
          className={cn(styles.input, {
            [styles.invalid]: !isValid.date
          })}
        />
      </div>

      <div className={styles['input-container']}>
        <label htmlFor='tag' className={styles.label}>
          <img src='./folder.svg' alt='Иконка папки' />
          <span>Метки</span>
        </label>
        <input
          value={values.tag}
          onChange={onChange}
          type='text'
          name='tag'
          id='tag'
          className={cn(styles.input, {
            [styles.invalid]: !isValid.tag
          })}
        />
      </div>

      <textarea
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
