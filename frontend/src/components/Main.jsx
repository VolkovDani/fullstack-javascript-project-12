import React, {
  useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels } from '../slices/channels';
import { authActions, getAuth } from '../slices/auth';
import { getCurrentChannelId } from '../slices/ui';
import { fetchMessages, sendMessage } from '../slices/messages';
import AddChannel from './modals/AddChannel';
import { ChannelMessages, ChannelsList } from './Channels';
import DeleteChannel from './modals/DeleteChannel';
import RenameChannel from './modals/RenameChannel';

const Navbar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href="/">Studying Chat</a>
      <button type="button" className="btn btn-primary">Выйти</button>
    </div>
  </nav>
);

const InputMessage = () => {
  const dispatch = useDispatch();
  const inputContainerEl = useRef(null);
  const [value, setValue] = useState('');
  const currentChannel = useSelector(getCurrentChannelId);
  const authData = useSelector(getAuth);
  const handlerSendMessage = (btnEvent) => {
    btnEvent.preventDefault();
    if (value === '') return;
    const message = {
      body: value,
      channelId: currentChannel,
      username: authData.username,
    };
    dispatch(sendMessage({
      token: authData.token,
      messageObj: message,
    }));
    setValue('');
    const messagesContainerEl = inputContainerEl.current.previousSibling;
    messagesContainerEl
      .scrollTo(0, messagesContainerEl.scrollHeight);
  };
  return (
    <div className="mt-auto px-5 py-3" ref={inputContainerEl}>
      <form
        className="py-1 border rounded-2"
        onSubmit={handlerSendMessage}
      >
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

const Chat = (props) => {
  const [modalVariant, setShowModal] = useState(false);
  const [idModalChannel, setIdModalChannel] = useState(null);

  const modals = {
    addChannel: AddChannel,
    deleteChannel: DeleteChannel,
    renameChannel: RenameChannel,
  };

  const { authInfo } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.setAuth(authInfo));
    dispatch(fetchChannels(authInfo.token));
    dispatch(fetchMessages(authInfo.token));
  }, [dispatch, authInfo]);

  const handleAddModal = () => {
    setShowModal('addChannel');
  };

  const channelsModals = (id) => ({
    handleDeleteChannel: () => {
      setIdModalChannel(id);
      setShowModal('deleteChannel');
    },
    handleRenameChannel: () => {
      setIdModalChannel(id);
      setShowModal('renameChannel');
    },
  });

  const CurrentModal = modals[modalVariant];

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button
                  type="button"
                  className="p-0 text-primary btn btn-group-vertical"
                  onClick={handleAddModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <ChannelsList channelsModals={channelsModals} />
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <ChannelMessages />
                <InputMessage />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        modalVariant
          ? (
            <CurrentModal
              handleSetState={setShowModal}
              modalState={modalVariant}
              extraData={idModalChannel}
            />
          )
          : null
      }
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
      <Chat authInfo={userAuthInfo} />
    );
  } return null;
};

export default Main;
