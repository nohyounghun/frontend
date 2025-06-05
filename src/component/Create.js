import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const labelStyle = {
  display: 'inline-block',
  width: '80px',
  marginBottom: '8px',
};

const inputStyle = {
  padding: '8px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '200px',
};

const buttonStyle = {
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1em',
};

const Create = ()=> {
  const [form, setForm] = useState({
    g_name: '',
    g_cost: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://port-0-backend-mbeepqzxd38cc578.sel4.cloudtype.app/goods', form)
    .then(()=>{
      alert('상품이 등록되었습니다.');
      navigate('/goods');
    })
    .catch(err=>console.log(err));
  }

  return (
    <section style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>상품 등록하기</h2>
      <form action='' onSubmit={handleSubmit}>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='g_name'>상품명 : </label>
          <input style={inputStyle} name='g_name' value={form.g_name} onChange={handleChange} required />
        </p>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='g_cost'>가격 : </label>
          <input style={inputStyle} type='number' name='g_cost' value={form.g_cost} onChange={handleChange} required />
        </p>
        <button style={buttonStyle} type='submit'>신규상품 등록하기</button>
      </form>
    </section>
  );
}

export default Create;
