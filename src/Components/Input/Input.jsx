import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input(
  { appereance, isValid, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(styles.input, {
        [styles.invalid]: !isValid,
        [styles['input-title']]: appereance === 'title'
      })}
    />
  );
});

export default Input;
