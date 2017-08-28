import React from 'react';

import PageTemplate from '../templates/PageTemplate';
import ItemContainer from '../organisms/ItemContainer';

const ItemPage = ({params}) => {
  return (
    <PageTemplate>
      <ItemContainer itemId={params.itemId}/>
    </PageTemplate>
  );
};

export default ItemPage;