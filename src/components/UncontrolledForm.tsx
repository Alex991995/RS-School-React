import React, { FormEvent, useState } from 'react';
import styles from '../styles/UncontrolledForm.module.css';
import * as Yup from 'yup';
import { ObjFormType, ObjErrorFormType } from '../utils/types';
import ProgressPassword from './ProgressPassword';
import { checkSize, toBase64 } from '../utils/functionHelpers';
import { country_list } from '../utils/constants';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .matches(/^[A-Z]\w+/, 'please enter name with first uppercased letter '),
  gender: Yup.string().required(),
  country: Yup.string().required(),
  email: Yup.string().required().email(),
  age: Yup.number().required().positive(),
  agree: Yup.boolean().required().isTrue(),
  password: Yup.string().required(),
  passwordConfirmation: Yup.string()
    .required('Passwords must match')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  img: Yup.mixed()
    .required()
    .test('fileSize', 'The size of img is too big', async function (value) {
      const { path, createError } = this;
      try {
        const file = value;
        await checkSize(file as File);
        return true;
      } catch {
        return createError({ path, message: ' big' });
      }
    }),
});

interface FormElements extends HTMLFormElement {
  username: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  gender: HTMLInputElement;
  password: HTMLInputElement;
  passwordConfirmation: HTMLInputElement;
  agree: HTMLInputElement;
  country: HTMLInputElement;
}

function UncontrolledForm() {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  function handleChange(string: string) {
    setShow(true);
    setValue(string);
  }

  function clickChange(string: string) {
    setShow(false);
    setValue(string);
  }

  const [objErrors, setObjErrors] = useState<ObjErrorFormType>({});
  const [objForms, setObjForms] = useState<ObjFormType>({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handelSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const elements = form.elements as unknown as FormElements;

    const newObjForms: ObjFormType = {
      username: elements.username.value,
      email: elements.email.value,
      gender: elements.gender.value,
      age: +elements.age.value,
      password: elements.password.value,
      passwordConfirmation: elements.confirmPassword.value,
      agree: elements.agree.checked,
      img: elements.img.files[0],
      country: elements.country.value,
    };

    try {
      await validationSchema.validate(newObjForms, { abortEarly: false });
      setObjForms({ ...newObjForms, img: await toBase64(elements.img.files[0]) });
      setObjErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newObjErrors: ObjErrorFormType = {};
        err.inner.forEach(error => {
          if (error.path === 'username') {
            newObjErrors.username = error.message;
          } else if (error.path === 'email') {
            newObjErrors.email = error.message;
          } else if (error.path === 'age') {
            newObjErrors.age = error.message;
          } else if (error.path === 'gender') {
            newObjErrors.gender = error.message;
          } else if (error.path === 'password') {
            newObjErrors.password = error.message;
          } else if (error.path === 'passwordConfirmation') {
            newObjErrors.passwordConfirmation = error.message;
          } else if (error.path === 'agree') {
            newObjErrors.agree = error.message;
          } else if (error.path === 'img') {
            newObjErrors.img = error.message;
          } else if (error.path === 'country') {
            newObjErrors.country = error.message;
          }
        });
        setObjErrors(newObjErrors);
      }
    }
  }
  console.log(objForms);

  return (
    <div className={styles['wrapper-form']}>
      <form className={styles.form} onSubmit={e => handelSubmit(e)}>
        <div className={styles.field}>
          <label className={styles.label}>Country</label>
          <input
            onFocus={() => setShow(true)}
            value={value}
            onChange={e => handleChange(e.target.value)}
            id="country"
            type="text"
            className={styles.input}
          />
          {show && (
            <ul className={styles['country-list']}>
              {country_list
                .filter(country => {
                  const searchTerm = value.toLocaleLowerCase();
                  const countryLeLowerCase = country.toLocaleLowerCase();
                  return searchTerm && countryLeLowerCase.startsWith(searchTerm);
                })
                .map((country, i) => (
                  <li
                    className={styles['country-item']}
                    onClick={() => clickChange(country)}
                    key={i}
                  >
                    {country}
                  </li>
                ))}
            </ul>
          )}
          {objErrors.country ? (
            <span className={styles.error}>{objErrors.country}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input id="username" type="text" className={styles.input} />
          {objErrors.username ? (
            <span className={styles.error}>{objErrors.username}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Age</label>
          <input id="age" type="number" className={styles.input} />
          {objErrors.age ? (
            <span className={styles.error}>{objErrors.age}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input id="email" type="text" className={styles.input} />
          {objErrors.email ? (
            <span className={styles.error}>{objErrors.email}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            id="password"
            type="password"
            className={styles.input}
          />

          {password ? (
            <ProgressPassword password={password} />
          ) : (
            <span className={styles.progress}></span>
          )}
          {objErrors.password ? (
            <span className={styles.error}>{objErrors.password}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Confirm Password</label>
          <input
            onChange={e => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            id="confirmPassword"
            type="password"
            className={styles.input}
          />
          {confirmPassword ? (
            <ProgressPassword password={confirmPassword} />
          ) : (
            <span className={styles.progress}></span>
          )}
          {objErrors.passwordConfirmation ? (
            <span className={styles.error}>{objErrors.passwordConfirmation}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Gender</label>

          <div className={styles['field-radio']}>
            <div>
              <input id="male" value="male" type="radio" name="gender" />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input id="female" value="female" type="radio" name="gender" />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          {objErrors.gender ? (
            <span className={styles.error}>{objErrors.gender}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div className={styles.field}>
          <input type="checkbox" id="agree" name="agree" value="anything" />
          <label htmlFor="agree">
            I Have Read And Agree To The Member Agreement/Terms And Conditions{' '}
          </label>
          {objErrors.agree ? (
            <span className={styles.error}>{objErrors.agree}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="img">Img </label>
          <input id="img" accept="image/*,.png,.jpg," type="file" />
          {objErrors.img ? (
            <span className={styles.error}>{objErrors.img}</span>
          ) : (
            <span className={styles.error}></span>
          )}
        </div>

        <div>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default UncontrolledForm;
