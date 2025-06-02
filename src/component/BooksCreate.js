import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

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

const buttonStyle = {
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1em',
  marginTop: '20px',
};

const BooksCreate = ()=> {
  const [form, setForm] = useState({
    name: '',
    area1: '',
    area2: '',
    area3: '',
    book_cnt: '',
    owner_nm: '',
    tel_num: ''
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

    axios.post('http://localhost:9070/books', form)
      .then(() => {
        alert('서점이 등록되었습니다.');
        navigate('/books');
      })
      .catch(err => console.log('등록 오류 : ', err));
  }

  return (
    <section style={{ padding: '20px', textAlign:'center' }}>
      <h2 style={{ marginBottom: '20px' }}>서점 등록하기</h2>
      <form onSubmit={handleSubmit}>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='name'>서점명 : </label>
          <input style={inputStyle} name='name' value={form.name} onChange={handleChange} required />
        </p>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='area1'>지역1 : </label>
          <input style={inputStyle} name='area1' value={form.area1} onChange={handleChange} required />
        </p>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='area2'>지역2 : </label>
          <input style={inputStyle} name='area2' value={form.area2} onChange={handleChange} required />
        </p>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='area3'>지역3 : </label>
          <input style={inputStyle} name='area3' value={form.area3} onChange={handleChange} required />
        </p>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='book_cnt'>서적수 : </label>
          <input style={inputStyle} type='number' name='book_cnt' value={form.book_cnt} onChange={handleChange} required />
        </p>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='owner_nm'>소유자명 : </label>
          <input style={inputStyle} name='owner_nm' value={form.owner_nm} onChange={handleChange} required />
        </p>
        <p style={{ marginBottom: '15px' }}>
          <label style={labelStyle} htmlFor='tel_num'>전화번호 : </label>
          <input style={inputStyle} name='tel_num' value={form.tel_num} onChange={handleChange} required />
        </p>

        <button style={buttonStyle} type='submit'>신규 서점 등록하기</button>
      </form>
    </section>
  );
}

export default BooksCreate;