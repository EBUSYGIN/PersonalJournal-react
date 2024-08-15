import './App.css';
import LeftPanel from './Layouts/LeftPanel/LeftPanel';
import AddCardButton from './Components/AddCardButton/AddCardButton';
import Body from './Layouts/Body/Body';
import JournalList from './Components/JournalList/JournalList';
import Header from './Components/Header/Header';
import JournalForm from './Components/JournalForm/JournalForm';
import { useLocalStorage } from './Hooks/useLocalStorage.hook';
import { mapItems } from './utils/mapItems.js';
import { SelectUser } from './Components/SelectUser/SelectUser.jsx';
import { UserContextProvider } from './context/user.context.jsx';
import { useState } from 'react';

// const DATA = [
//   // {
//   //   id: 2,
//   //   title: 'Подготовка к обновлению курсов',
//   //   date: new Date(),
//   //   text: 'Думал, что очень много времени'
//   // },
//   // {
//   //   id: 1,
//   //   title: 'Поход в годы',
//   //   date: new Date(),
//   //   text: 'Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем.'
//   // }
// ];

function App() {
  const [items, setItem] = useLocalStorage('data', []);
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = (item) => {
    if (!item.id) {
      setItem([
        ...mapItems(items),
        {
          text: item.text,
          date: new Date(item.date),
          tag: item.tag,
          title: item.title,
          id: items.length > 0 ? Math.max(...items.map((el) => el.id)) + 1 : 1,
          userId: item.userId
        }
      ]);
    } else {
      setItem([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return {
              ...item
            };
          }
          return i;
        })
      ]);
    }
  };

  return (
    <UserContextProvider>
      <div className='app'>
        <LeftPanel>
          <Header />
          <SelectUser></SelectUser>
          <AddCardButton />
          <JournalList
            items={mapItems(items)}
            setSelectedItem={setSelectedItem}
          />
        </LeftPanel>
        <Body>
          <JournalForm addItem={addItem} selectedItem={selectedItem} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
