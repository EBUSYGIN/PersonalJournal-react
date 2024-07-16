import './JournalItem.css';

function JournalItem({ title, date, text }) {
  const formatedData = new Intl.DateTimeFormat('ru-RU').format(date);

  return (
    <>
      <h2 className='journal-item__header'>{title}</h2>
      <div className='journal-item__body'>
        <div className='journal-item__date'>{formatedData}</div>
        <div className='journal-item__text'>{text}</div>
      </div>
    </>
  );
}

export default JournalItem;
