import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useActions from '../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../features/slices/usersSlice';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../styles/Form.module.css';
import ProgressPassword from '../components/ProgressPassword';
import ShowErrorField from '../components/ShowErrorField';

import { ObjFormType } from '../utils/types';
import { toBase64, validationSchema } from '../utils/functionHelpers';

function FormСontrolled() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { addData } = useActions();
  const navigate = useNavigate();
  const country_list = useSelector(selectCountries);

  const [dataOfUser, setDataOfUser] = useState<ObjFormType>({});

  const password = watch('password');
  const confirmPassword = watch('passwordConfirmation');

  const onSubmit: SubmitHandler<ObjFormType> = async data => {
    const newData: ObjFormType = {
      username: data.username,
      email: data.email,
      gender: data.gender,
      age: data.age,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      agree: data.agree,
      img: data.img,
      country: data.country,
    };

    if (newData.img instanceof FileList) {
      setDataOfUser({ ...newData, img: await toBase64(newData.img[0]) });
    }
  };

  useEffect(() => {
    if (Object.keys(dataOfUser).length !== 0) {
      addData(dataOfUser);
      navigate('/');
    }
  }, [dataOfUser]);

  return (
    <div className={styles['wrapper-form']}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label className={styles.label}>Country</label>

          <input
            {...register('country')}
            id="country"
            type="text"
            className={styles.input}
            list="countrydata"
          />
          <datalist id="countrydata">
            {country_list.map((country, i) => (
              <option value={country} key={i}>
                {country}
              </option>
            ))}
          </datalist>

          <ShowErrorField error={errors.country?.message} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input {...register('username')} id="username" type="text" className={styles.input} />
          <ShowErrorField error={errors.username?.message} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Age</label>
          <input {...register('age')} id="age" type="number" className={styles.input} />
          <ShowErrorField error={errors.age?.message} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            autoComplete="username"
            {...register('email')}
            id="email"
            type="text"
            className={styles.input}
          />
          <ShowErrorField error={errors.email?.message} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            {...register('password')}
            autoComplete="new-password"
            id="password"
            type="password"
            className={styles.input}
          />
          <ProgressPassword password={password} />

          <ShowErrorField error={errors.password?.message} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Confirm Password</label>
          <input
            {...register('passwordConfirmation')}
            autoComplete="new-password"
            id="confirmPassword"
            type="password"
            className={styles.input}
          />
          <ProgressPassword password={confirmPassword} />

          <ShowErrorField error={errors.passwordConfirmation?.message} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Gender</label>

          <div className={styles['field-radio']}>
            <div>
              <input {...register('gender')} id="male" value="male" type="radio" name="gender" />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                {...register('gender')}
                id="female"
                value="female"
                type="radio"
                name="gender"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <ShowErrorField error={errors.gender?.message} />
        </div>

        <div className={styles.field}>
          <input {...register('agree')} type="checkbox" id="agree" name="agree" />
          <label htmlFor="agree">
            I Have Read And Agree To The Member Agreement/Terms And Conditions{' '}
          </label>
          <ShowErrorField error={errors.agree?.message} />
        </div>

        <div className={styles.field}>
          <label htmlFor="img">Img </label>
          <input {...register('img')} id="img" accept="image/*,.png,.jpg," type="file" />
          <ShowErrorField error={errors.img?.message} />
        </div>

        <div>
          <button type="submit" disabled={!isValid} className={styles.button}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormСontrolled;
