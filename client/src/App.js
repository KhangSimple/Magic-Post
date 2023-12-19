import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthProvider from './provider/authProvider';
import Routes from './routes';

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
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
