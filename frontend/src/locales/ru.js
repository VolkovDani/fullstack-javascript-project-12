export default {
  Components: {
    Channels: {
      Dropdown: {
        rename: 'Переименовать',
        delete: 'Удалить',
      },
    },
    ChannelMessages: {
      Header: {
        messagesCount: {
          messages_zero: 'сообщений',
          messages_one: 'сообщение',
          messages_few: 'сообщения',
          messages_many: 'сообщений',
        },
      },
    },
    Login: {
      avatarImage: 'Аватар',
      Form: {
        title: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        login: 'Войти',
        noAccount: 'Нет аккаунта?',
        registerAccount: 'Регистрация',
        errorWrongUser: 'Неверные имя пользователя или пароль',
        aria: {
          login: 'Логин',
          password: 'Пароль',
          linkRegisterAccount: 'Перейти к регистрации',
          username: 'Ваш ник',
        },
      },
    },
    Main: {
      InputMessage: {
        enterMessage: 'Введите сообщение...',
        sendButton: 'Отправить',
        aria: {
          enterMessage: 'Введите сообщение',
        },
      },
      Chat: {
        channels: 'Каналы',
        aria: {
          addChannel: 'Добавить канал',
        },
      },
    },
    MainHeader: {
      brandName: 'Hexlet Chat',
      leave: 'Выйти',
      aria: {
        toMainPage: 'Перейти на главную страницу',
        leave: 'Выйти',
      },
    },
    NotFound: {
      pageNotFound: 'Страница не найдена',
      backToMain: 'Вернуться на главную страницу',
      noAccount: 'Нет аккаунта?',
      registerAccount: 'Регистрация',
      aria: {
        toMainPage: 'Вернуться на главную страницу',
        linkRegisterAccount: 'Перейти к регистрации',
      },
    },
    SignUp: {
      alt: {
        avatar: 'Аватар радостного пользователя',
      },
      errors: {
        userExists: 'Это имя уже занято',
      },
      Form: {
        title: 'Регистрация',
        username: 'Ваш ник',
        password: 'Ваш пароль',
        confirmPassword: 'Повторите пароль',
        confirmRegister: 'Регистрация',
        alreadyHaveAccount: 'Уже есть аккаунт?',
        backToLogin: 'Войти',
        aria: {
          username: 'Введите ваш ник',
          backToLogin: 'Вернуться в окно входа',
        },
      },
    },
    AddChannel: {
      errors: {
        channelExists: 'Такое название канала уже есть',
      },
      title: 'Добавить канал',
      inputPlaceholder: 'Твоё название канала',
      sendButton: 'Отправить',
    },
    DeleteChannel: {
      title: 'Удалить канал',
      confirm: 'Уверены?',
      cancel: 'Отменить',
      delete: 'Удалить',
    },
    RenameChannel: {
      errorChannelExists: 'Новое имя совпадает с именем другого канала',
      title: 'Переименовать канал',
      placeholder: 'Новое название канала',
      cancel: 'Отменить',
      send: 'Отправить',
    },
  },
  toast: {
    ERR_NETWORK: 'Ошибка соединения',
    ERR_BAD_REQUEST: 'Ошибка авторизации',
  },
};
