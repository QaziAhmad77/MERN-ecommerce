import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Data from './data.json';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(Data);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);
  return (
    <>
      <div>
        home
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          Logout
        </button>
        <h1>PRODUCT LIST</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {data.map((item, index) => {
            return (
              <div
                style={{
                  margin: '50px 30px',
                  background: '#eee',
                  width: '20%',
                }}
                key={item._id}
              >
                <img
                  src={item.url}
                  style={{ width: '100%', height: '300px' }}
                  alt=""
                />
                <p>
                  {item.name} | {item.category}
                </p>
                <p>
                  <strong>Seller:</strong> {item.seller}
                </p>
                <p>
                  <strong>Price:</strong> {item.price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
