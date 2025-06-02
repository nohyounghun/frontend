import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import Main from './component/Main';
import Goods from './component/Goods';
import Create from './component/Create';
import Update from './component/Update';
import Books from './component/Books';
import BooksUpdate from './component/BooksUpdate';
import BooksCreate from './component/BooksCreate';
import Fruits from './component/Fruits';
import FruitsUpdate from './component/FruitsUpdate';
import FruitsCreate from './component/FruitsCreate';
import Question from './component/Question';
import Login from './component/Login';
import Register from './component/Register';
import { AlertContext} from './component/AlertContext';
import React from 'react';


function App() {
  const { question, goodsCount, booksCount, fruitsCount } = React.useContext(AlertContext);
  return (
    <>
      <BrowserRouter> {/* 브라우저의 라우터 범위를 설정 */}
        <header>
          <h1>Frontend setting - React + MySQL(메인페이지)</h1>
{/*           localhost:3000 === index.html
          localhost:9070/goods */}
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/goods'>Goods{
              goodsCount > 0 &&(
                <span style={{
                  display: 'inline-block',
                  marginLeft: '6px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '14px',
                  textAlign: 'center',
                  lineHeight:'22px',
                  fontWeight: 'bold',
                }}>
                  {goodsCount}
                </span>
              )
            }</Link>
            <Link to='/books'>Books{
              booksCount > 0 &&(
                <span style={{
                  display: 'inline-block',
                  marginLeft: '6px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '14px',
                  textAlign: 'center',
                  lineHeight:'22px',
                  fontWeight: 'bold',
                }}>
                  {booksCount}
                </span>
              )
            }</Link>
            <Link to='/fruits'>Fruits{
              fruitsCount > 0 &&(
                <span style={{
                  display: 'inline-block',
                  marginLeft: '6px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '14px',
                  textAlign: 'center',
                  lineHeight:'22px',
                  fontWeight: 'bold',
                }}>
                  {fruitsCount}
                </span>
              )
            }</Link>
            <Link to='/question'>Question{
              question > 0 && (
                <span style={{
                  display: 'inline-block',
                  marginLeft: '6px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '14px',
                  textAlign: 'center',
                  lineHeight:'22px',
                  fontWeight: 'bold',
                }}>
                  {question}
                </span>
              )
            }</Link>
            <Link to='/login'>Login</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/goods' element={<Goods />} />
            <Route path='/goods/update/:g_code' element={<Update />} />
            <Route path='/goods/create' element={<Create />} />

            <Route path='/books' element={<Books />} />
            <Route path='/books/booksupdate/:num' element={<BooksUpdate />} />
            <Route path='/books/bookscreate' element={<BooksCreate />} />

            <Route path='/fruits' element={<Fruits />} />
            <Route path='/fruits/fruitsupdate/:num' element={<FruitsUpdate />} />
            <Route path='/fruits/fruitscreate' element={<FruitsCreate />} />
            
            <Route path='/question' element={<Question />} />

            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </main>

        <footer>
          <address>Copyright&copy;2025 Backend&Frontend allrights reserved.</address>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
