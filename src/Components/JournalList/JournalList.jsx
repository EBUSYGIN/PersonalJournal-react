import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';
import { useContext, useMemo } from 'react';

function JournalList({ items, setSelectedItem }) {
  // return <div className='journal-list'>{children}</div>;
  const { userId } = useContext(UserContext);
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredItems = useMemo(
    () => items.filter((i) => i.userId === userId).sort(sortItems),
    [items, userId]
  );

  if (items.length === 0) {
    return <div>Записей нет, добавьте новую</div>;
  } else {
    return (
      <div className='journal-list'>
        {filteredItems.map((item) => (
          <CardButton
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            <JournalItem title={item.title} date={item.date} text={item.text} />
          </CardButton>
        ))}
      </div>
    );
  }
}

export default JournalList;
