import axios from 'axios';
function Test() {
  const handleClick = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  const handleCallAPI = () => {};
  return (
    <div style={{ padding: 10 }}>
      <button style={{ fontSize: 30 }} onClick={() => handleCallAPI()}>
        Call API
      </button>
      <br></br>
      <button style={{ fontSize: 30, marginTop: 20 }} onClick={() => handleClick()}>
        Logout
      </button>
    </div>
  );
}

export default Test;
