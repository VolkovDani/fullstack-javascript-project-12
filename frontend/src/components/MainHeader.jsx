import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const MainHeader = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'MainHeader' });
  const userData = localStorage.getItem('user');
  const handleAccountExit = () => {
    localStorage.removeItem('user');
  };
  return (
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
  );
};

export default MainHeader;
