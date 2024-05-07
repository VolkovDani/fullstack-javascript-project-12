import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { errorsSelectors } from '../slices/errors';

const MainHeader = () => {
  const { t, i18n } = useTranslation('Components', { keyPrefix: 'MainHeader' });
  const userData = localStorage.getItem('user');
  const handleAccountExit = () => {
    localStorage.removeItem('user');
  };

  const errorsData = useSelector((state) => errorsSelectors.selectById(state, 0));
  if (errorsData) toast.error(i18n.t(errorsData.code, { ns: 'toast' }));

  return (
    <>
      <ToastContainer
        pauseOnFocusLoss={false}
      />
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a
            className="navbar-brand"
            href="/"
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
                  href="/login"
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
