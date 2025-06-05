import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AlertContext } from './AlertContext';

function Books(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setBooksCount } = useContext(AlertContext);

  /* 페이지번호 */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 보여지는 게시물 개수

  const indexOfLast = currentPage * itemsPerPage; // 현재 페이지의 마지막 인덱스

  const indexOfFirst = indexOfLast - itemsPerPage; // 현재 페이지의 첫 인덱스

  const runningItems = data.slice(indexOfFirst, indexOfLast); // 현재 페이지에 해당하는 데이터

  const totalpage = Math.ceil(data.length / itemsPerPage); // 전체 페이지 수

  let startPage = Math.max(1, currentPage - 2); // 시작 페이지 번호
  let lastPage = Math.min(totalpage, startPage + 4); // 끝 페이지 번호

  const pageNumbers = Array.from({ length: lastPage - startPage + 1 }, (_, i) => startPage + i); // 페이지 번호 배열

  const loadData = () => {
    axios.get('https://port-0-backend-mbeepqzxd38cc578.sel4.cloudtype.app/books')
    .then(res=>{
      setData(res.data);
      setBooksCount(res.data.length);  // AlertContext에 있는 booksCount를 업데이트
    })
    .catch(err=>console.log(err));
  }

  useEffect(()=>{
    loadData();
  }, []);

  const deleteData = (b_code) => {
    if (window.confirm('정말 삭제하시겠습니까?')){
      axios.delete(`https://port-0-backend-mbeepqzxd38cc578.sel4.cloudtype.app/books/${b_code}`)
      .then(()=>{
        alert('삭제되었습니다.');
        loadData();
        
        if ((currentPage - 1) * itemsPerPage >= data.length - 1 && currentPage > 1){
          setCurrentPage(currentPage - 1);
    }})
      .catch(err=>console.log(err));
    }
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const captionStyle = {
    textAlign: 'center',
    captionSide: 'top',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '1.2em',
  };

  const thStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    padding: '8px',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid #dee2e6',
    padding: '8px',
  };

  const buttonStyle = {
    padding: '6px 12px',
    marginRight: '5px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#333',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9em',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    borderColor: '#dc3545',
    backgroundColor: '#dc3545',
  };

  const addButtonContainerStyle = {
    textAlign: 'right',
    marginTop: '15px',
  };

  const addButton = {
    padding: '8px 16px',
    borderRadius: '5px',
    border: '1px solid #28a745',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1em',
  };

  return (
    <section>
      <h3>서점 DB 입력/출력/삭제/수정</h3>
      <p>MySQL DB에 있는 자료를 출력하고, 자료입력, 삭제, 수정하기를 실습응용한다.</p>

      <table style={tableStyle}>
        <caption style={captionStyle}>Books Store Data</caption>
        <thead>
          <tr>
            <th style={thStyle}>num</th>
            <th style={thStyle}>name</th>
            <th style={thStyle}>area1</th>
            <th style={thStyle}>area2</th>
            <th style={thStyle}>area3</th>
            <th style={thStyle}>book_cnt</th>
            <th style={thStyle}>owner_nm</th>
            <th style={thStyle}>tel_num</th>
            <th style={thStyle}>작업</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(data => (
              <tr key={data.num}>
                <td style={tdStyle}>{data.num}</td>
                <td style={tdStyle}>{data.name}</td>
                <td style={tdStyle}>{data.area1}</td>
                <td style={tdStyle}>{data.area2}</td>
                <td style={tdStyle}>{data.area3}</td>
                <td style={tdStyle}>{Number(data.BOOK_CNT).toLocaleString()}</td>
                <td style={tdStyle}>{data.owner_nm}</td>
                <td style={tdStyle}>{data.tel_num}</td>
                <td style={tdStyle}>
                  <button style={buttonStyle} onClick={() => navigate(`/books/booksupdate/${data.num}`)}>수정</button>
                  <button style={deleteButtonStyle} onClick={() => {deleteData(data.num)}}>삭제</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* 이전 버튼 */}
      {currentPage > 1 && (
        <button
          style={{
            marginRight: '5px',
            padding: '5px 10px',
            border: '1px solid #333',
            borderRadius: '5px',
            backgroundColor: currentPage === 1 ? '#333' : 'white',
            color: currentPage === 1 ? 'white' : '#333',
            cursor: 'pointer',
          }}
        onClick={()=> setCurrentPage(currentPage - 1)}>
        이전</button>
      )}

      {/* 페이지 넘버 */}
      {pageNumbers.map(number=>(
        <button
          key={number}
          onClick={()=> setCurrentPage(number)}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            border: '1px solid #333',
            borderRadius: '5px',
            backgroundColor: currentPage === number ? '#333' : 'white',
            color: currentPage === number ? 'white' : '#333',
            cursor: 'pointer',
          }}
        >
          {number}</button>
      ))}

      {/* 다음 버튼 */}
      {currentPage < totalpage && (
        <button
          style={{
            marginRight: '5px',
            padding: '5px 10px',
            border: '1px solid #333',
            borderRadius: '5px',
            backgroundColor: currentPage === 1 ? '#333' : 'white',
            color: currentPage === 1 ? 'white' : '#333',
            cursor: 'pointer',
          }}
          onClick={()=> setCurrentPage(currentPage + 1)}>
          다음</button>
      )}

      <div style={addButtonContainerStyle}>
        <button style={addButton} onClick={()=>{
          navigate('/books/bookscreate')
        }}>상품등록</button>
      </div>
    </section>
  );
}

export default Books;
