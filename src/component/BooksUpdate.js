import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const labelStyle = {
  display: 'inline-block',
  width: '100px',
  marginBottom: '8px',
  fontWeight: 'bold',
};

const inputStyle = {
  padding: '8px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '250px',
};

const readOnlyInputStyle = {
  ...inputStyle,
  backgroundColor: '#f8f9fa',
  color: '#495057',
};

const buttonStyle = {
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#333',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1em',
  marginTop: '20px',
};

export default function BooksUpdate() {
  const { num } = useParams();
  const [form, setForm] = useState({
    num: '',
    name: '',
    area1: '',
    area2: '',
    area3: '',
    book_cnt: '',
    owner_nm: '',
    tel_num: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://port-0-backend-mbeepqzxd38cc578.sel4.cloudtype.app/books/${num}`)
      .then(res => {
        console.log("서버 응답값", res.data);
        setForm(res.data);
      })
      .catch(err => console.log('조회 오류 : ', err));
  }, [num]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9070/books/booksupdate/${num}`, {
      name: form.name,
      area1: form.area1,
      area2: form.area2,
      area3: form.area3,
      book_cnt: form.book_cnt,
      owner_nm: form.owner_nm,
      tel_num: form.tel_num
    })
      .then(() => {
        alert('수정되었습니다.');
        navigate('/books');
      })
      .catch(err => console.log('수정 오류 : ', err));
  };

  return (
    <div style={{ padding: '20px', textAlign:'center' }}>
      <h3 style={{ marginBottom: '20px' }}>목록 수정</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>num : </label>
          <input style={readOnlyInputStyle} name='num' value={form.num} readOnly />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>name : </label>
          <input style={inputStyle} name='name' value={form.name} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>area1 : </label>
          <input style={inputStyle} name='area1' value={form.area1} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>area2 : </label>
          <input style={inputStyle} name='area2' value={form.area2} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>area3 : </label>
          <input style={inputStyle} name='area3' value={form.area3} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>book_cnt : </label>
          <input style={inputStyle} type='number' name='book_cnt' value={form.book_cnt} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>owner_nm : </label>
          <input style={inputStyle} name='owner_nm' value={form.owner_nm} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>tel_num : </label>
          <input style={inputStyle} name='tel_num' value={form.tel_num} onChange={handleChange} required />
        </div>
        <button style={buttonStyle} type='submit'>수정</button>
      </form>
    </div>
  );
}
