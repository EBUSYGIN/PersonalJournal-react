import CardButton from '../CardButton/CardButton';
import './AddCardButton.css';

function AddCardButton() {
  return (
    <CardButton className='journal-add'>
      <img src='/add.svg' alt='Add icon' />
      Новое воспоминание
    </CardButton>
  );
}

export default AddCardButton;
