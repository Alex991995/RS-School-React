import { useState } from 'react';
import useActions from '../hooks/useActions';

import styles from '../styles/Checkbox.module.css';
import { Product } from '../types/fetchTypes';
interface CheckboxProps {
  checked?: boolean;
  product: Product;
}

function Checkbox({ checked, product }: CheckboxProps) {
  const [check, setChecked] = useState(false);
  const { saveProduct } = useActions();

  function handlerChecked(check: boolean, product: Product) {
    setChecked(check);
    saveProduct({ ...product, checked: check });
  }

  return (
    <label className={styles.label}>
      <input
        className={styles.checkbox}
        onChange={() => handlerChecked(!check, product)}
        checked={checked}
        type="checkbox"
        name="check"
      />
      <span className="label-text"> {checked ? 'selected' : 'unselected'}</span>
    </label>
  );
}

export default Checkbox;
