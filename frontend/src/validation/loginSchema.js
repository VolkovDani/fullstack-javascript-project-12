import * as yup from 'yup';

export default yup.object().shape({
  username: yup
    .string()
    .min(5, 'Минимальное количество символов - 5')
    .max(30, 'Максимальное количество символов - 30')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(5, 'Минимальное количество символов - 5')
    .max(30, 'Максимальное количество символов - 30')
    .required('Обязательное поле'),
});
