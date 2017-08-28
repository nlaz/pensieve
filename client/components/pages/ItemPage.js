import React from 'react';

import PageTemplate from '../templates/PageTemplate';
import ItemContainer from '../organisms/ItemContainer';

const ItemPage = ({params, router}) => {
  return (
    <PageTemplate>
      <ItemContainer itemId={params.itemId} router={router}/>
    </PageTemplate>
  );
};

export default ItemPage;