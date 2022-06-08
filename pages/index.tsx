import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { FormEvent, useState } from 'react';

const Home: NextPage = () => {
  const [values, setValues] = useState({
    order: '112020102292999',
    amount: 0,
    tel: '',
    email: '',
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!values.amount || !values.tel || !values.email) return;

      const res = await axios.post('/api/ipay', values);
      window.open(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>iPay Payment Gateway </title>
        <meta name="description" content="iPay Payment Gateway" />
      </Head>

      <main
        style={{ minHeight: '90vh', display: 'grid', placeItems: 'center' }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '3rem' }}>Pay with iPay</h1>
          <form onSubmit={submitHandler} style={{ textAlign: 'left' }}>
            <div
              style={{
                marginBottom: '8px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <label htmlFor="amount">Amount (No commas)</label>
              <input
                type="text"
                id="amount"
                placeholder="No commas"
                value={values.amount}
                onChange={(e) =>
                  setValues({ ...values, amount: Number(e.target.value) })
                }
              />
            </div>

            <div
              style={{
                marginBottom: '8px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <label htmlFor="tel">Tel</label>
              <input
                type="tel"
                placeholder="254700123123"
                value={values.tel}
                onChange={(e) => setValues({ ...values, tel: e.target.value })}
              />
            </div>

            <div
              style={{
                marginBottom: '8px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="mail@mail.com"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>

            <button type="submit">Pay Now</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
