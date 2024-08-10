import styles from '../styles/SelectedItems.module.css';
import { Product } from '../types/fetchTypes';
import useActions from '@/hooks/useActions';

interface SelectedItemsProps {
  storedProducts: Product[] | undefined;
}

function SelectedItems({ storedProducts }: SelectedItemsProps) {
  const { resetAllProduct } = useActions();

  const numberOfSelectedItems = storedProducts?.length;

  const headers = 'Id,Title,Description,Price';
  let rows = '';

  storedProducts?.forEach(item => {
    const id = item.id.toString().replace(/"/g, '""');
    const title = item.title.replace(/"/g, '""');
    const description = item.description.replace(/"/g, '""');
    const price = item.price.toString().replace(/"/g, '""');

    rows += `"${id}","${title}","${description}","${price}"\n`;
  });
  const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

  const encodedURI = encodeURI(csvContent);
  const name = `${numberOfSelectedItems}_products.csv`;

  function isHowManyItems(numberOfSelectedItems: number | undefined) {
    if (numberOfSelectedItems === 1) return '1 item is selected';
    return `${numberOfSelectedItems} items are selected`;
  }

  return (
    <div>
      {storedProducts?.length !== 0 && (
        <div className={styles.selectedItems}>
          <div className={styles.content}>
            <div>
              <h3 className={styles['content__title']}>{isHowManyItems(numberOfSelectedItems)}</h3>
            </div>

            <div className={styles['content__buttons']}>
              <button onClick={() => resetAllProduct()} className="button">
                Unselect all
              </button>
              <a href={encodedURI} className={`button ${styles['button__link']}`} download={name}>
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedItems;
