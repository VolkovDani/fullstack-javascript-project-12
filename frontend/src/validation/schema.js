import * as yup from 'yup';

export const loginSchema = yup.object().shape({
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

export const channelsNamingSchema = yup.object({
  channelName: yup
    .string()
    .min(3, 'Минимальное количество символов - 3')
    .max(20, 'Максимальное количество символов - 20')
    .required('Имя не должно быть пустым'),
});
