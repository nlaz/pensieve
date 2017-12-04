import React from 'react';
import { Link } from 'react-router';

import Footer from '../footer';
import PageTemplate from './PageTemplate';

export default function NotFoundPage() {
  return (
    <PageTemplate footer={<Footer />}>
      <div className="col-md-8 offset-md-2 text-center">
        <span style={{ fontSize: '80px', fontWeight: 'bold' }}>4😅4</span>
        <h3 style={{ marginBottom: '40px' }}>Oops, something went wrong.</h3>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </PageTemplate>
  );
}
