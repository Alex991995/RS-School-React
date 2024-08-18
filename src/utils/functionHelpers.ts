import * as Yup from 'yup';
import { country_list } from '../utils/constants';

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to convert file to base64 string.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };
  });

export async function checkSize(file: File) {
  const tenMB = 10 * 1024 * 1024;

  if (!file || file.size > tenMB) {
    throw new Error('The size of img is too big');
  }
  return await toBase64(file);
}

export const validationSchema = Yup.object()
  .shape({
    username: Yup.string()
      .required()
      .matches(/^[A-Z]\w+/, 'please enter name with first uppercased letter '),
    gender: Yup.string().required(),
    country: Yup.string().required().oneOf(country_list, 'please choose from the list'),
    email: Yup.string().required().email(),
    age: Yup.number()
      .required('ee')
      .positive('should be positive')
      .typeError('Age must be a number'),
    agree: Yup.boolean().required().isTrue('You should agree'),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string()
      .required('Passwords must match')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    img: Yup.mixed<FileList>()
      .required()
      .test('fileSize', 'The size of img is too big', async function (value) {
        const { path, createError } = this;

        if (value instanceof FileList && value.length > 0) {
          const file = value[0];
          try {
            await checkSize(file as File);
            return true;
          } catch (error) {
            const errorMessage = (error as Error).message || 'The size of img is too big';
            return createError({ path, message: errorMessage });
          }
        }
        return createError({ path, message: 'Please choose a relevant image.' });
      }),
  })
  .required();
