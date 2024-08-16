import './Button.css';
import { memo } from 'react';

function Button({ text }) {
  return <button className='button accent'>{text}</button>;
}

export default memo(Button);
