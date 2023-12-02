import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [backendData, setBackendData] = useState([])
  const [transId, setTransId] = useState('')
  const handleGetTrans = () => {
    axios.get(`http://localhost:1510/transaction/${transId}`, 
    // {
    //   params: {
    //     id: transId
    //   }
    // }
    )
    .then(function (response) {
      setBackendData(prev => [...response.data.data]);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  return (
    <div className="App">
      <img className='bgImg' src='https://meest.com/uploads/images/58ff1989b97bbae7bcda3158eb77caf2.png' alt='bgImg'/>
    </div>
  );
}

export default App;
