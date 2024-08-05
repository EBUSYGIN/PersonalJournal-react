import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

export function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  // console.log(userId);

  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <select name='user' id='user' value={userId} onChange={changeUser}>
      <option value='1'>User1</option>
      <option value='2'>User2</option>
    </select>
  );
}
