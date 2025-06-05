import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertContext';

function Goods(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { goodsCount, setGoodsCount } = useContext(AlertContext);

  /* 페이지 상태변수 선언 */
  const [currentPage, setCurrentPage] = useState(1); //초기값 1
  const itemPerPage = 7; // 한 페이지에 보여줄 게시물 수

  const loadData = () => {
    axios
      .get('http://backend/goods')
      .then(res =>{
        setData(res.data);
        setGoodsCount(res.data.length);
       }) // AlertContext에 있는 goodsCount를 업데이트
      .catch(err => console.log(err));
  }

  useEffect(() => {
    loadData();
  }, []);

  const deleteData = (g_code) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios.delete(`http://localhost:9070/goods/${g_code}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData();
          
        })
        .catch(err => console.log(err));
    }
  };

  const indexOfLast = currentPage * itemPerPage;
  //현재 페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻

  const indexOfFirst = indexOfLast - itemPerPage;
  //현재 페이지의 첫 인덱스 번호를 계산 10-5=5, 5번째부터 9번째 아이템까지 보여주겠다는 뜻

  const currentItems = data.slice(indexOfFirst, indexOfLast);
  //data 배열 중 현재 페이지에 해당하는 부분만 잘라냅니다.
  //예:data.slice(5, 10) -> data[5], data[6], data[7], data[8], data[9]만 화면에 표시

  const totalPages = Math.ceil(data.length / itemPerPage);
  //전체 페이지 수 totalbpages = Math.ceil(13 / 5) = 3, 무조건 올림


  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  //페이지 번호 배열

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
      <h4>페이지네이션의 주요 기능</h4>
      <ul>
        <li>데이터 분할 : 많은 양의 데이터를 여러 페이지로 나누어 보여준다.</li>
        <li>페이지 이동 : 페이지 번호 링크를 통해 사용자가 원하는 페이지를 볼 수 있다.</li>
        <li>현재 페이지 표시 : 현재 사용자가 보고 있는 페이지를 강조표시(굵게)하여 현재 위치를 쉽게 파악할 수 있다.</li>
        <li>페이지간 이동 : 이전 페이지, 다음 페이지 등으로 이동할 수 있는 링크기능을 제공한다.</li>
        <li>페이지당 게시물 개수 조정 : 사용자가 원하는 페이지당 항목 수를 선택할 수 있도록 옵션을 제공할 수 있다.</li>
        <li>페이지네이션은 사용자의 경험 향상, 서버부담감소, UI디자인의 단순화 장점이 있다.</li>
      </ul>
      <h2>&nbsp;</h2>
      <div style={{height:'400px'}}>
        <table style={tableStyle}>
          <caption style={captionStyle}>Goods Data</caption>
          <thead>
            <tr>
              <th style={thStyle}>g_code</th>
              <th style={thStyle}>g_name</th>
              <th style={thStyle}>g_cost</th>
              <th style={thStyle}>작업</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.map(data => (
            //data.map(data => (
              <tr key={data.g_code}>
                <td style={tdStyle}>{data.g_code}</td>
                <td style={tdStyle}>{data.g_name}</td>
                <td style={tdStyle}>{Number(data.g_cost).toLocaleString()}</td>
                <td style={tdStyle}>
                  <button style={buttonStyle} onClick={() => navigate(`/goods/update/${data.g_code}`)}>수정</button>
                  &nbsp;
                  <button style={deleteButtonStyle} onClick={() => { deleteData(data.g_code) }}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지 번호 나오게 */}
      <div style={{marginTop:'20px', textAlign:'center', width:'450px'}}>
        {pageNumbers.map(number=>(
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            style={{
              marginRight:'5px',
              backgroundColor:currentPage === number?'#4caf50':'#f0f0f0',
              color:currentPage === number?'#fff':'#000',
              padding:'5px 10px',
              border:'none',
              borderRadius:'4px',
              cursor:'pointer',
            }}
            >
            {number}
          </button>
        ))} 
      </div>

      <div style={addButtonContainerStyle}>
        <button style={addButton} onClick={() => {
          navigate('/goods/create');
        }}>상품 등록</button>
      </div>
    </section>
  );
}

export default Goods;
