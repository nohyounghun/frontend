import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
  backgroundColor: '#333',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1em',
};

export default function Update() {
  const { g_code } = useParams();
  const [form, setForm] = useState({
    g_code: '',
    g_name: '',
    g_cost: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9070/goods/${g_code}`)
      .then(res => {
        console.log("서버 응답값:", res.data);
        setForm(res.data);
      })
      .catch(err => console.log('조회 오류 : ', err));
  }, [g_code]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:9070/goods/update/${g_code}`, {
      g_name: form.g_name,
      g_cost: form.g_cost
    })
      .then(() => {
        alert('상품이 수정되었습니다.');
        navigate('/goods');
      })
      .catch(err => console.log('수정 오류 : ', err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>상품 수정</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>코드: </label>
          <input style={{ ...inputStyle, backgroundColor: '#eee', color: '#555' }} name="g_code" value={form.g_code} readOnly />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>이름: </label>
          <input style={inputStyle} name="g_name" value={form.g_name} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>가격: </label>
          <input style={inputStyle} type="number" name="g_cost" value={form.g_cost} onChange={handleChange} required />
        </div>
        <button style={buttonStyle} type="submit">수정</button>
      </form>
    </div>
  );
}