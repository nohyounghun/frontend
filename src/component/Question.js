import React, {useState} from 'react'; //리액트 훅 상태변수
import axios from 'axios'; //서버측과 통신

const Question= () => {
  //1. 상태변수 선언
  const [formData, setFormData] = useState({
    name:'',
    tel:'',
    email:'',
    txtbox:''
  });

  //2. 입력양식에 사용자가 입력시 함수 호출
  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  }

  //3. 입력완료 or 전송하기 or send버튼 클릭시 실행되는 함수
  //서버측에 post방식으로 데이터를 넘기기 위한 내용
  const handleSubmit = async e => {
    e.preventDefault();
    try { //데이터 전송 성공 시
      await axios.post('http://localhost:9070/question', formData);
      alert('질문이 등록되었습니다.');

      // 데이터 전송 후 입력창 초기화
      setFormData({name:'', tel:'', email:'', txtbox:''});

    } catch { //데이터 전송 실패 시
      alert("질문 등록에 실패했습니다. 다시 시도해주세요.");
    }
  }
  
  const questionText = {
    fontSize:'14px',
  }

  const qustionForm = {
    width:'100%',
    margin:'5px auto',
    padding:'10px',
    backgroundColor:'#fff',
    borderRadius:'5px',
    border:'none',

  }

  return (
    <form onSubmit={handleSubmit} style={{
      width:'100%',
      margin:'0 auto',
      padding:'20px',
    }}>
      <h2 className='formh2' style={{textAlign:'center'}}>정성을 다해 답변을 해드리겠습니다</h2>
      <section style={{
        width:'50%',
        margin:'0 auto',
        padding:'20px',
        backgroundColor:'#f0f0f0',
        borderRadius:'10px',
      }}>
        <div className="flxe_wrap" style={{
          display:'flex',
          justifyContent:'space-evenly',
          }}>
          <div className='left_form'>
            <p>
              <label htmlFor='name' style={questionText}>성함</label>
              <input type="text" id='name' name='name' value={formData.name} onChange={handleChange} placeholder='성함을 입력해주세요' required style={qustionForm} />
            </p>
            <p>
              <label htmlFor='tel' style={questionText}>전화번호</label>
              <input type="text" id='tel' name='tel' value={formData.tel} onChange={handleChange} placeholder='전화번호를 입력해주세요' required style={qustionForm} />
            </p>
            <p>
              <label htmlFor='email' style={questionText}>이메일</label>
              <input type="email" id='email' name='email' value={formData.email} onChange={handleChange} placeholder='이메일을 입력해주세요' required style={qustionForm} />
            </p>
          </div>

          <div className='right_form'>
            <label htmlFor='txtbox' style={questionText}>내용</label>
            <textarea rows='13' cols='50' id='txtbox' name='txtbox' value={formData.txtbox} onChange={handleChange} placeholder='내용을 입력해주세요' maxLength={300} required style={qustionForm}></textarea>
          </div>
        </div>
        
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div style={{marginLeft:'96px'}}>
            <input type="checkbox" required id='agree' />
            <label htmlFor="agree" style={{fontSize:'14px'}}>개인정보처리 방침에 동의합니다.</label>
          </div>
          <input type="submit" value="보내기" style={{cursor:'pointer', marginRight:'80px', backgroundColor:'#333', border:'none', color:'#fff', borderRadius:'3px', padding:'10px 10px'}} />
        </div>
      </section>
    </form>
  );
}

export default Question;