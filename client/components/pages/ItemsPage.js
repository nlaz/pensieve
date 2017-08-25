import React from 'react';

import PageTemplate from '../templates/PageTemplate';
import Header from '../Header';
import ItemsContainer from '../items/ItemsContainer';

const ItemsPage = () => {
  return (
    <PageTemplate>
      <ItemsContainer />
    </PageTemplate>
  );
};

export default ItemsPage;