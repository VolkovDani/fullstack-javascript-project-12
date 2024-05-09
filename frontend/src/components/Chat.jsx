import React, { useEffect, useRef, useState } from 'react';
import leo from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentChannelId } from '../slices/ui';
import { messagesSelectors, sendMessage } from '../slices/messages';
import { channelsSelectors } from '../slices/channels';
import { getAuth } from '../slices/auth';

export const ChannelMessages = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'ChannelMessages' });

  const listEl = useRef(null);
  const currentChannelId = useSelector(getCurrentChannelId);
  const allMessages = useSelector(messagesSelectors.selectEntities);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));

  useEffect(() => {
    if (currentChannel) listEl.current.scrollTo(1, listEl.current.scrollHeight);
  }, [currentChannel, currentChannelId]);
  const messages = Object.values(allMessages)
    .filter(({ channelId }) => channelId === currentChannelId);

  if (!currentChannel) return null;
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${currentChannel.name}`}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} ${t('Header.messagesCount.messages', { count: messages.length })}`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={listEl}>
        {messages.length > 0
          ? messages.map(({ body, username, id }) => (
            <div className="text-break mb-2" key={id}>
              <b>{username}</b>
              {`: ${leo.clean(body)}`}
            </div>
          )) : null}
      </div>
    </>
  );
};

export const InputMessage = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'Main' });
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
            placeholder={t('InputMessage.enterMessage')}
            className="border-0 p-0 ps-2 form-control"
            value={value}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
            aria-label={t('InputMessage.aria.enterMessage')}
          />
          <button
            type="submit"
            disabled=""
            className="btn btn-group-vertical"
          >
            <span className={value ? null : 'visually-hidden'}>
              {t('InputMessage.sendButton')}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
