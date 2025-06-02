import React, {useState} from 'react';
import axios from 'axios';

function Register(props) {
  //1.변수선언
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(''); //에러시 출력 변수
  const [success, setSuccess] = useState(''); //성공시 출력 변수

  //2. 사용자가 입력양식에 입력을 하면 발생되는 함수
  const handleChange = (e) =>{ //이벤트 객체를 인자로 받는다.
    setForm({...form, [e.target.name]: e.target.value}); //입력값을 상태변수에 저장
    setError(''); //입력시 에러 메시지 초기화
    setSuccess(''); //입력시 성공 메시지 초기화
  };

  //3. 내용 전송하기
  const handleSubmit = async (e) => {
    e.preventDefault(); //폼의 기본 동작(새로고침)을 막는다.

    //비밀번호 확인하기 (2개의 비밀번호가 일치하는지)
    if(form.password !== form.confirmPassword){
      setError('비밀번호가 일치하지 않습니다.'); //에러 메시지 설정
      return; //함수 종료
    }
    try{ //db서버와 통신이 잘되면 post방식으로 id, pw를 넘긴다.
      const res = await axios.post('http://localhost:9070/register',{
        username : form.username,
        password : form.password
      });

      if (res.data.success) {
        setSuccess('회원가입이 완료되었습니다!');
        setError('');
        setForm({ username: '', password: '', confirmPassword: '' });
      }
    }catch(err){ //실패시 아래 에러 출력
      if (err.response && err.response.data && err.response.data.error) {
        setError('회원가입 실패 : ' + err.response.data.error);
      } else {
        setError('회원가입 실패 : 서버 오류입니다.');
      }
    }
  }

  return (
    <section>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input type="text" id='username' name='username' placeholder='아이디' value={form.username} onChange={handleChange} required/>
        </p>

        <p>
          <label htmlFor="password">패스워드 : </label>
          <input type="password" id='password' name='password' placeholder='비밀번호' value={form.password} onChange={handleChange} required />
        </p>

        <p>
          <label htmlFor="confirmPassword">패스워드 확인 : </label>
          <input type="password" id='confirmPassword' name='confirmPassword' placeholder='비밀번호 확인' value={form.confirmPassword} onChange={handleChange} required />
        </p>
        <p>
          <button type='submit'>회원가입</button>
        </p>

        {/* 에러가 나면 빨강색으로 문자 출력 */}
        {error && <p style={{color:'red'}}>{error}</p>}

        {/* 회원가입 성공하면 초록색 문자 출력 */}
        {success &&  <p style={{color:'green'}}>{success}</p>}
      </form>
    </section>
  );
}

export default Register;