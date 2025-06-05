import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  //1. 상태변수 선언
  const [form, setForm] = useState({
    username: '', //아이디를 저장하기 위한 변수
    password: '' //패스워드를 저장하기 위한 변수
  });

  const [error, setError] = useState('');

  //2. 입력시 발생되는 함수
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  //3 로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(form.username, form.password)
    try{//성공시 실행내용
      const res = await axios.post('https://port-0-backend-mbeepqzxd38cc578.sel4.cloudtype.app/login', form);

      //사용자 인증이 끝나면 '토큰'을 발급한다.
      localStorage.setItem('token', res.data.token); //토큰을 로컬스토리지에 저장
      alert('로그인 성공');
      navigate('/');
    }catch(err){//실패시 실행내용
      setError('로그인 실패 : 아이디와 패스워드가 일치하지 않습니다.');
    }
  }
  return (
    <section>
      <h2>로그인 폼</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input type="text" id='username' name='username' placeholder='아이디' required onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="password">비밀번호 : </label>
          <input type="password" id='password' name='password' placeholder='패스워드' required onChange={handleChange} />
        </p>
        <p>
          <input type="submit" value='로그인' className='login-button' />
        </p>
        {error&&<p style={{color:'red'}}>{error}</p>}
        <p>아이디찾기ㅣ비번찾기ㅣ</p><p style={{backgroundColor:'yellow', display:'inline-block', color:'white', cursor:'pointer'}}><Link to='/register'>회원가입</Link></p>
        
        {/* 
          카카오 api 로그인
        */}

        <dl>
          <dt>로그인 구현 전체 구성</dt>
          <dd>프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청</dd>
          <dd>백엔드(Node.js + Express) : 로그인 처리, JWT 토큰발급</dd>
          <dd>데이터베이스(MYSQL) : DB입/출력</dd>
          <dd>보안 : 비밀번호는 bcrypt로 암호화, JWT로 인증을 유지</dd>
        </dl>

        <pre>
          //1. 데이터베이스 테이블 설계
          CREATE TABLE users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            datatime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          )

          //2. 데이터베이스에 회원정보 입력하기(INSERT INTO)
          INSERT INTO users VALUES (1, 'noh', '1234', '2025-05-26');
          INSERT INTO users VALUES (2, 'noh1', '1234', '2025-05-26');
          INSERT INTO users VALUES (3, 'noh2', '1234', '2025-05-26');
          INSERT INTO users VALUES (4, 'noh3', '1234', '2025-05-26');
          INSERT INTO users VALUES (5, 'noh4', '1234', '2025-05-26');
          //3. UI화면 설계 - 로그인폼 구현
        </pre>

      </form>
    </section>
  );
}

export default Login;
