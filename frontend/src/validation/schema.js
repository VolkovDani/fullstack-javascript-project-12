import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Минимальное количество символов - 3')
    .max(30, 'Максимальное количество символов - 30')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(5, 'Минимальное количество символов - 5')
    .max(30, 'Максимальное количество символов - 30')
    .required('Обязательное поле'),
});

export const channelsNamingSchema = yup.object({
  channelName: yup
    .string()
    .min(3, 'Минимальное количество символов - 3')
    .max(20, 'Максимальное количество символов - 20')
    .required('Имя не должно быть пустым'),
});

export const signUpSchema = yup.object({
  login: yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Введите логин'),
  password: yup
    .string()
    .min(6, 'От 6 до 20 символов')
    .max(20, 'От 6 до 20 символов')
    .required('Введите пароль'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароль должны совпадать')
    .required('Это обязательное поле'),
});
