import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectors as channelsSelectors, fetchChannels } from '../slices/channels';
import { actions as uiActions } from '../slices/ui';
import { actions as authActions } from '../slices/auth';

const Navbar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href="/">Studying Chat</a>
      <button type="button" className="btn btn-primary">Выйти</button>
    </div>
  </nav>
);

const Channel = ({ name, selected }) => (
  <li className="nav-item w-100">
    <button
      type="button"
      className={
        selected
          ? 'w-100 rounded-0 text-start btn btn-secondary'
          : 'w-100 rounded-0 text-start btn'
      }
    >
      <span className="me-1">#</span>
      {
        name
      }
    </button>
  </li>
);

const ChannelsList = () => {
  const dispatch = useDispatch();
  const arrChannels = useSelector(channelsSelectors.selectAll);
  // [ {id, name, removable}, {}, ... ]
  useEffect(() => {
    console.log(arrChannels);
    dispatch(uiActions.setCurrentChannel(arrChannels[0]));
  }, [dispatch, arrChannels]);
  const currentChannel = useSelector((state) => state.ui.idSelectedChannel);
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {arrChannels ? arrChannels.map((entity) => {
        const { name, id } = entity;
        if (Number(id) === Number(currentChannel)) return <Channel name={name} key={id} selected />;
        return <Channel name={name} key={id} />;
      }) : null}
    </ul>
  );
};

const InputMessage = () => {
  const [value, setValue] = useState('');
  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value={value}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
          />
          <button
            type="submit"
            disabled=""
            className="btn btn-group-vertical"
          >
            <span className={value ? null : 'visually-hidden'}>Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const Chat = () => {
  const dispatch = useDispatch();
  const userAuthInfo = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    dispatch(fetchChannels(userAuthInfo.token));
    dispatch(authActions.setAuth(userAuthInfo));
  }, [dispatch, userAuthInfo]);
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical">
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <ChannelsList />
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0"><b># general</b></p>
                  <span className="text-muted">0 сообщений</span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5" />
                <InputMessage />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify" />
    </>
  );
};

const Main = () => {
  const navigator = useNavigate();
  const userAuthInfo = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!userAuthInfo) navigator('/login');
  });
  if (userAuthInfo) {
    return (
      <Chat />
    );
  } return null;
};

export default Main;
