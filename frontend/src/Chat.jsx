import React, { useState } from 'react';

const Navbar = function Navbar() {
  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Lunohod Chat</a>
          <button type="button" className="btn btn-primary">Выйти</button>
        </div>
      </nav>
    </>
  );
};

const ChannelsList = function ChannelsList() {
  return (
    <>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <li className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
            <span className="me-1">#</span>general
          </button>
        </li>
        <li className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>random
          </button>
        </li>
      </ul>
    </>
  );
};

const InputMessage = function InputMessage() {
  const [value, setValue] = useState('');
  return (
    <>
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
            /><button
              type="submit"
              disabled=""
              className="btn btn-group-vertical"
            >
              <span className={value ? null : 'visually-hidden'}>Отправить</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default function Chat() {
  return (
    <>
      <div className="h-100">
        <div className="h-100" id="chat">
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
          <div className="Toastify"></div>
        </div>
      </div>
    </>
  );
}
