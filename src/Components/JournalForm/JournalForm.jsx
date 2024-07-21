import { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';

function JournalForm({ addItem }) {
  const [isFormValid, setFormValid] = useState({
    title: true,
    date: true,
    text: true,
    tag: true
  });

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    if (
      !formProps.title?.trim().length ||
      !formProps.date ||
      !formProps.text?.trim().length ||
      !formProps.tag?.trim().length
    ) {
      setFormValid({
        title: Boolean(formProps.title?.trim().length),
        date: Boolean(formProps.date),
        text: Boolean(formProps.text?.trim().length),
        tag: Boolean(formProps.tag?.trim().length)
      });
    } else {
      setFormValid({
        title: Boolean(formProps.title?.trim().length),
        date: Boolean(formProps.date),
        text: Boolean(formProps.text?.trim().length),
        tag: Boolean(formProps.tag?.trim().length)
      });
      addItem(formProps);
    }
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type='text'
          name='title'
          className={cn(styles['input-title'], {
            [styles.invalid]: !isFormValid.title
          })}
        />
      </div>
      <div className={styles['input-container']}>
        <label htmlFor='date' className={styles.label}>
          <img src='./calendar.svg' alt='Иконка календаря' />
          <span>Дата</span>
        </label>
        <input
          id='date'
          type='date'
          name='date'
          className={cn(styles.input, {
            [styles.invalid]: !isFormValid.date
          })}
        />
      </div>

      <div className={styles['input-container']}>
        <label htmlFor='tag' className={styles.label}>
          <img src='./folder.svg' alt='Иконка папки' />
          <span>Метки</span>
        </label>
        <input
          type='text'
          name='tag'
          id='tag'
          className={cn(styles.input, {
            [styles.invalid]: !isFormValid.tag
          })}
        />
      </div>

      <textarea
        name='text'
        id=''
        cols='30'
        rows='10'
        className={cn(styles.input, {
          [styles.invalid]: !isFormValid.text
        })}
      />
      <Button text={'Сохранить'} />
    </form>
  );
}

export default JournalForm;
