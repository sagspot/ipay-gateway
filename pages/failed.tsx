import Head from 'next/head';
import React from 'react';

const SuccessPage = () => {
  return (
    <>
      <Head>
        <title>Failed || iPay Payment Gateway </title>
        <meta name="description" content="iPay Payment Gateway" />
      </Head>

      <main
        style={{ minHeight: '90vh', display: 'grid', placeItems: 'center' }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '3rem' }}>Failed</h1>
          <p>Payment was unsuccessful</p>
        </div>
      </main>
    </>
  );
};

export default SuccessPage;
