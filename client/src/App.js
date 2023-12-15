import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import { publicRoutes } from './routes';

function App() {
  const [backendData, setBackendData] = useState([]);
  const [transId, setTransId] = useState('');
  const handleGetTrans = () => {
    axios
      .get(
        `http://localhost:1510/transaction/${transId}`,
        // {
        //   params: {
        //     id: transId
        //   }
        // }
      )
      .then(function (response) {
        setBackendData((prev) => [...response.data.data]);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          // let Layout = DefaultLayout;
          // if (route.layout) {
          //   Layout = route.layout;
          // } else if (route.layout === null) {
          //   Layout = Fragment;
          // }
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
