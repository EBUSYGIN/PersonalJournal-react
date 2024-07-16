import React from 'react';
import './App.css';
import LeftPanel from './Layouts/LeftPanel/LeftPanel';
import CardButton from './Components/CardButton/CardButton';
import JournalItem from './Components/JournalItem/JournalItem';
import AddCardButton from './Components/AddCardButton/AddCardButton';
import Body from './Layouts/Body/Body';
import JournalList from './Layouts/JournalList/JournalList';
import Header from './Components/Header/Header';
import JournalForm from './Components/JournalForm/JournalForm';
import { useState } from 'react';

const DATA = [
  {
    title: 'Подготовка к обновлению курсов',
    date: new Date(),
    text: 'Думал, что очень много времени',
  },
  {
    title: 'Поход в годы',
    date: new Date(),
    text: 'Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем.',
  },
];

function App() {
  const [items, setItem] = useState(DATA);

  const addItem = (item) => {
    setItem((oldItems) => [
      ...oldItems,
      {
        text: item.text,
        date: item.date,
        tag: item.tag,
        title: item.title,
      },
    ]);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <AddCardButton />
        <JournalList>
          {items.map((item) => (
            <CardButton>
              <JournalItem
                title={item.title}
                date={item.date}
                text={item.text}
              />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm addItem={addItem} />
      </Body>
    </div>
  );
}

export default App;
