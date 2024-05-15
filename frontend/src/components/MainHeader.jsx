import React, { useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { toastSelectors } from '../slices/toast';
import { getAuth } from '../slices/auth';
import { pages as pagesRoutes } from '../utils/routes';

const MainHeader = () => {
  const { t, i18n } = useTranslation('Components', { keyPrefix: 'MainHeader' });
  const userData = localStorage.getItem('user');
  const authInfo = useSelector(getAuth);
  const handleAccountExit = () => {
    localStorage.removeItem('user');
  };
  const infoData = useSelector((state) => toastSelectors.selectById(state, 0));
  const errorsData = useSelector((state) => toastSelectors.selectById(state, 1));

  useEffect(() => {
  }, [authInfo]);

  useMemo(() => {
    if (infoData) toast.success(i18n.t(infoData.code, { ns: 'toast' }));
    if (errorsData) toast.error(i18n.t(errorsData.code, { ns: 'toast' }));
  }, [infoData, i18n, errorsData]);

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
