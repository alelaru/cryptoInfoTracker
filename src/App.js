import { Layout, Space, Typography } from 'antd';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails';
import Exchanges from './components/Exchanges';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import News from './components/News';

function App() {

  return (
    <div className="app">
      <div className="navbar">
        <Navbar></Navbar>
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <HomePage/>
              </Route>
              <Route exact path="/exchanged">
                 <Exchanges/>
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies/>
              </Route>
              <Route exact path="/crypto/:coindId">
                <CryptoDetails/>
              </Route>
              <Route exact path="/news">
                <News/>
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer" >
        <Typography.Title level={5} style={{color: "white", textAlign:"center"}}>
          Cryptoconverse <br/>
          All rights reserved
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>

        </Space>
      </div>
      </div>
    </div>
  );
}

export default App;
