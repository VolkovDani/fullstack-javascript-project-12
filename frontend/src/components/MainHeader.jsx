import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { selectToastMessage } from '../slices/toast';
import { pages as pagesRoutes } from '../utils/routes';

const MainHeader = () => {
  const { t, i18n } = useTranslation('Components', { keyPrefix: 'MainHeader' });
  const userData = localStorage.getItem('user');
  const handleAccountExit = () => {
    localStorage.removeItem('user');
  };
  const toastMessage = useSelector(selectToastMessage);

  const generatorMessages = {
    0: () => toast.success(i18n.t(toastMessage.code, { ns: 'toast' })),
    1: () => toast.error(i18n.t(toastMessage.code, { ns: 'toast' })),
  };

  if (toastMessage) generatorMessages[toastMessage.id]();

  return (
    <>
      <ToastContainer
        pauseOnFocusLoss={false}
      />
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a
            className="navbar-brand"
            href={pagesRoutes.root()}
            aria-label={t('aria.toMainPage')}
          >
            {
              t('brandName')
            }
          </a>
          {
            userData
              ? (
                <Button
                  variant="primary"
                  href={pagesRoutes.login()}
                  onClick={handleAccountExit}
                  aria-label={t('aria.leave')}
                >
                  {
                    t('leave')
                  }
                </Button>
              )
              : null
          }
        </div>
      </nav>
    </>
  );
};

export default MainHeader;
