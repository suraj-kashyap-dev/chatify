import Login from './pages/accounts/Login';
import Home from "./pages/Home";

function App(params) {
  const isAuth = false;

  return (
    <>
      {isAuth ? <Home></Home> : <Login></Login>}
    </>
  );
}

export default App;
