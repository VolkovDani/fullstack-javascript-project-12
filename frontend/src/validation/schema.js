import * as yup from 'yup';

export default yup.setLocale({
  mixed: {
    required: 'requiredField',
  },
  string: {
    min: 'minLength',
    max: 'maxLength',
  },
});

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(20),
  password: yup
    .string()
    .min(6),
});

export const channelsNamingSchema = yup.object({
  channelName: yup
    .string()
    .min(3)
    .max(20)
    .required('Имя не должно быть пустым'),
});

export const signUpSchema = yup.object({
  username: yup
    .string()
    .min(3)
    .max(20)
    .required(),
  password: yup
    .string()
    .min(6)
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required(),
});
