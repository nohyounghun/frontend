import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertContext';

function Fruits(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setFruitsCount } = useContext(AlertContext);

  // 페이지 번호 저장을 위한 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 보여지는 게시물 개수

  // 페이지 계산공식 현재 게시물 수 56개 / 5 = 11페이지
  const indexOfLast = currentPage * itemsPerPage;

  // 현재 페이지의 첫 인덱스 번호를 계산 10 - 5 = 5
  const indexOfFirst = indexOfLast - itemsPerPage;

  // data 배열 중 현재 페이지에 해당하는 부분만 잘라냄
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  // 전체 페이지 수 totalpage = Math.ceil(전체게시물수 / 한페이지에 보여지는 게시물 수)
  const totalpage = Math.ceil(data.length / itemsPerPage);

  //시작번호와 끝번호를 계산해야 한다.
  let startPage = Math.max(1, currentPage - 2); // 시작 페이지 번호
  let lastPage = Math.min(totalpage, startPage + 4); // 끝 페이지 번호

  // 페이지 번호 배열 (1~5를 종적으로 변환되도록 변경 또는 totalPages까지 제한가능)
  //const pageNumbers = Array.from({ length: Math.min(totalpage, 5) }, (_, i) => i + 1);
  const pageNumbers = Array.from({ length: lastPage - startPage + 1 }, (_, i) => startPage + i);

  //2. 상품 리스트 조회(출력)
  const loadData = () => {
    //react 비동기 통신
    axios
      //db에서 json데이터를 불러온다.
      .get('https://port-0-backend-mbeepqzxd38cc578.sel4.cloudtype.app/fruits')
      //성공시 데이터를 변수에 저장
      .then(res =>{ setData(res.data);
                    setFruitsCount(res.data.length);
      })
      //실패시 에러 출력
      .catch(err => console.log(err));
  }
  //리액트훅인 useEffect를 사용하여 컴포넌트가 처음 마운트 되었을 경우에만 loadData()함수를 실행 함
  //리액트의 생명주기 함수인 componentDidMount()와 비슷한 역할을 한다.
  useEffect(() => {
    loadData();
  }, []);

  /* 삭제 */
  const deleteData = (num) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios.delete(`https://port-0-backend-mbeepqzxd38cc578.sel4.cloudtype.app/fruits/${num}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData();

          /* 마지막 페이지에 1개만 남아있고 삭제하면, currentPage가 totalPage보다 커질 수 있다. */
          //이럴 때, 삭제 후 아래와 같이 페이지리를 조정하는 것이 UX에 좋다.
          if ((currentPage - 1) * itemsPerPage >= data.length - 1 && currentPage > 1){
            setCurrentPage(currentPage - 1);
          }
        })
        .catch(err => console.log(err));
    }
  }

  const thstyle = {
    width: '50px',
    padding: '10px',
  }

  return (
    <div>
      <table style={{
        margin: '0 auto',
        borderCollapse: 'collapse',
        width: '70%',
        textAlign: 'center',
        border: '1px solid #333',
      }}>
        <caption style={{
          fontWeight: 'bold',
          padding:'30px',
          fontSize: '20px',
        }}>Fruits Data</caption>
        <thead>
          <tr style={{
            backgroundColor: '#333',
            color: 'white',
            fontWeight:'light',
            fontSize: '18px',
          }}>
            <th style={{
              ...thstyle,
              width: '50px',

            }}>num</th>
            <th>name</th>
            <th>price</th>
            <th>color</th>
            <th>country</th>
            <th>option</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => ( // currentItems를 매핑
            <tr key={item.num} style={{
              backgroundColor: item.num % 2 === 0 ? '#f2f2f2' : 'white',
              fontSize: '16px',
              fontWeight: 'light',
              color: '#333',
              textAlign: 'center',
              borderBottom: '1px solid #ddd',
              height: '50px',
              cursor: 'pointer',
            }}>
              <td>{item.num}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.color}</td>
              <td>{item.country}</td>
              <td>
                <button onClick={() => navigate(`/fruits/fruitsupdate/${data.num}`)}>수정</button>&nbsp;
                <button onClick={() => { deleteData(item.num) }}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
        <p style={{
          textAlign: 'center',
        }}>
          {/* 이전 버튼 들어가는곳 */}
          {currentPage > 1 && (
            <button
              style={{
                marginRight:'5px',
                backgroundColor: currentPage === 1 ? '#333' : 'white',
                color: currentPage === 1 ? 'white' : '#333',
                padding: '5px 10px',
                border: '1px solid #333',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={()=> setCurrentPage(currentPage - 1)}
            >이전</button>
          )}

          {/* 페이지 넘버 1,2,3,4,5 출력 */}
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              style={{ 
                margin:'10px 5px',
                backgroundColor: currentPage === number ? '#333' : 'white',
                color: currentPage === number ? 'white' : '#333',
                padding: '5px 10px',
                border: '1px solid #333',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {number}
            </button>
          ))}

          {/* 다음 버튼 들어가는곳 */}
          {currentPage < totalpage && (
            <button
            style={{
              marginRight:'5px',
              backgroundColor: currentPage === 1 ? '#333' : 'white',
              color: currentPage === 1 ? 'white' : '#333',
              padding: '5px 10px',
              border: '1px solid #333',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
              onClick={()=> setCurrentPage(currentPage + 1)}
            >다음</button>
          )}
        </p>

        <p style={{
          textAlign: 'center',
        }}>
          <button 
            style={{  
              backgroundColor: '#333',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => {
            navigate('/fruits/fruitscreate');
          }}>상품등록</button>
        </p>
      </div>
    </div>

  );
}

export default Fruits;
