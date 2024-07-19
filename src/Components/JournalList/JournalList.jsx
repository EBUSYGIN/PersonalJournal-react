import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ items }) {
  // return <div className='journal-list'>{children}</div>;

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  if (items.length === 0) {
    return <div>Записей нет, добавьте новую</div>;
  } else {
    return (
      <div className='journal-list'>
        {items.sort(sortItems).map((item) => (
          <CardButton key={item.id}>
            <JournalItem title={item.title} date={item.date} text={item.text} />
          </CardButton>
        ))}
      </div>
    );
  }
}

export default JournalList;
