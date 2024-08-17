import React, { FormEvent, useEffect, useState } from 'react';
import styles from '../styles/UncontrolledForm.module.css';
import * as Yup from 'yup';
import { ObjFormType, ObjErrorFormType } from '../utils/types';
import ProgressPassword from '../components/ProgressPassword';
import { checkSize, toBase64 } from '../utils/functionHelpers';
import { fieldForm } from '../utils/constants';
import ShowErrorField from '../components/ShowErrorField';
import useActions from '../hooks/reduxHooks';
import { country_list } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .matches(/^[A-Z]\w+/, 'please enter name with first uppercased letter '),
  gender: Yup.string().required(),
  country: Yup.string().required().oneOf(country_list, 'please choose from the list'),
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
  img: HTMLInputElement;
}

function UncontrolledForm() {
  const { addData } = useActions();

  const navigate = useNavigate();

  const [objErrors, setObjErrors] = useState<ObjErrorFormType>({});
  const [dataOfUser, setDataOfUser] = useState<ObjFormType>({});
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined);

  async function handelSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const elements = form.elements as unknown as FormElements;

    const newData: ObjFormType = {
      username: elements.username.value,
      email: elements.email.value,
      gender: elements.gender.value,
      age: +elements.age.value,
      password: elements.password.value,
      passwordConfirmation: elements.confirmPassword.value,
      agree: elements.agree.checked,
      img: elements.img.files ? elements.img.files[0] : null,
      country: elements.country.value,
    };

    try {
      await validationSchema.validate(newData, { abortEarly: false });
      if (elements.img.files) {
        setDataOfUser({ ...newData, img: await toBase64(elements.img.files[0]) });
      }
      setObjErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newObjErrors: ObjErrorFormType = {};
        err.inner.forEach(error => {
          if (error.path) {
            if (fieldForm.includes(error.path)) {
              const key = error.path;
              newObjErrors[key as keyof ObjErrorFormType] = error.message;
            }
          }
        });
        setObjErrors(newObjErrors);
      }
    }
  }

  useEffect(() => {
    if (Object.keys(dataOfUser).length !== 0) {
      addData(dataOfUser);
      navigate('/');
    }
  }, [dataOfUser]);

  return (
    <div className={styles['wrapper-form']}>
      <form className={styles.form} onSubmit={e => handelSubmit(e)}>
        <div className={styles.field}>
          <label className={styles.label}>Country</label>

          <input id="country" type="text" className={styles.input} list="countrydata" />
          <datalist id="countrydata">
            {country_list.map((country, i) => (
              <option value={country} key={i}>
                {country}
              </option>
            ))}
          </datalist>

          <ShowErrorField error={objErrors.country} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input id="username" type="text" className={styles.input} />
          <ShowErrorField error={objErrors.username} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Age</label>
          <input id="age" type="number" className={styles.input} />
          <ShowErrorField error={objErrors.age} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input id="email" type="text" className={styles.input} />
          <ShowErrorField error={objErrors.email} />
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
          <ProgressPassword password={password} />

          <ShowErrorField error={objErrors.password} />
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
          <ProgressPassword password={confirmPassword} />

          <ShowErrorField error={objErrors.passwordConfirmation} />
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
          <ShowErrorField error={objErrors.gender} />
        </div>

        <div className={styles.field}>
          <input type="checkbox" id="agree" name="agree" value="anything" />
          <label htmlFor="agree">
            I Have Read And Agree To The Member Agreement/Terms And Conditions{' '}
          </label>
          <ShowErrorField error={objErrors.agree} />
        </div>

        <div className={styles.field}>
          <label htmlFor="img">Img </label>
          <input id="img" accept="image/*,.png,.jpg," type="file" />
          <ShowErrorField error={objErrors.img} />
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
