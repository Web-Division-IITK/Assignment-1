import React , {useState, useEffect} from 'react';
import axios from 'axios';
import MainPage from './component/MainPage';
import Notes from './component/notes';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
      const checkLogin = async ()=>{
        const token = localStorage.getItem('tokenStore')
        if(token){
          const verify = await axios.get('/users/verify',{
            header:{Authorization:token}
          });
          setIsLogin(verify.data);
          if(verify.data === false)localStorage.clear();
        }else{
          setIsLogin(false);
        }
      }
      checkLogin();
  },[])
  return (
    <div className="App">
    {
      isLogin ? <Notes setIsLogin={setIsLogin}/> : <MainPage setIsLogin={setIsLogin}/>
    }
    </div>
  );
}

export default App;
