import { useState } from 'react';
import styles from '../styles/Checkbox.module.css';
import { Product } from '../types/fetchTypes';
import { useAppDispatch } from '../hooks/reduxHooks';
import { saveProduct } from '../features/slices/productSlice';

interface CheckboxProps {
  checked: boolean;
  product: Product;
}

function Checkbox({ checked, product }: CheckboxProps) {
  const [check, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  function handlerChecked(check: boolean, product: Product) {
    setChecked(check);
    dispatch(saveProduct({ ...product, checked: check }));
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
      <span className={'label-text'}> {checked ? 'selected' : 'unselected'}</span>
    </label>
  );
}

export default Checkbox;
