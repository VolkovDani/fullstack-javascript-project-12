import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation('NotFound');
  return (
    <div className="container">
      <div className="row">
        <div className="col pt-3">
          <h1>{t('pageNotFound')}</h1>
          <Link to="/">{t('backToMain')}</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
