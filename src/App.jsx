import React from 'react';
import './App.css';
import LeftPanel from './Layouts/LeftPanel/LeftPanel';
import CardButton from './Components/CardButton/CardButton';
import JournalItem from './Components/JournalItem/JournalItem';
import AddCardButton from './Components/AddCardButton/AddCardButton';


function App() {
  const data = [{
    title: 'Подготовка к обновлению курсов',
    date: new Date,
    text: 'Думал, что очень много времени'
  },{
    title: 'Поход в годы',
    date: new Date,
    text: 'Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем.'
  }];

  return (
    <div className='app'>
      <AddCardButton />
      <CardButton>
        <JournalItem 
          title = {data[0].title}
          date = {data[0].date}
          text = {data[0].text}
        />
      </CardButton>
    </div>
  )
}

export default App
