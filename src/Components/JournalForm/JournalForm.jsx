import { useState } from 'react';
import Button from '../Button/Button';
import './JournalForm.css';

function JournalForm({ addItem }) {
  const [isFormValid, setFormValid] = useState({
    title: true,
    date: true,
    text: true
  });

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    if (
      !formProps.title?.trim().length ||
      !formProps.date ||
      !formProps.text?.trim().length
    ) {
      setFormValid({
        title: Boolean(formProps.title?.trim().length),
        date: formProps.date,
        text: formProps.text?.trim().length
      });
    } else {
      setFormValid({
        title: Boolean(formProps.title?.trim().length),
        date: formProps.date,
        text: formProps.text?.trim().length
      });
      addItem(formProps);
    }
  };

  return (
    <form className='journal-form' onSubmit={addJournalItem}>
      <input
        type='text'
        name='title'
        style={{ border: isFormValid.title ? '' : '1px solid red' }}
      />
      <input type='date' name='date' />
      <input type='text' name='tag' />
      <textarea name='text' id='' cols='30' rows='10' />
      <Button text={'Сохранить'} />
    </form>
  );
}

export default JournalForm;
