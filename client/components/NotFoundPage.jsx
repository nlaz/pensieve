import React from 'react';
import { Link } from 'react-router';
import Footer from './Footer';

import PageTemplate from './PageTemplate';

export default function NotFoundPage() {
  return (
    <PageTemplate footer={<Footer />}>
      <div className="col-md-8 col-md-offset-2 text-center margin-top">
        <span style={{ fontSize: '80px', fontWeight: 'bold' }}>4😅4</span>
        <h3 style={{ marginBottom: '40px' }}>Oops, something went wrong.</h3>
        <Link to="/" className="button button--primary">
          Go Home
        </Link>
      </div>
    </PageTemplate>
  );
}
