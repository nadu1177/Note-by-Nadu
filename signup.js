import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
export default function Signup(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const router=useRouter();
  const handle=async(e)=>{e.preventDefault();
    try{await createUserWithEmailAndPassword(auth,email,password);
      router.push('/dashboard');}catch(err){setError(err.message);}};
  return(<div style={{padding:'2rem'}}>
    <h2>Sign Up</h2><form onSubmit={handle}>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email'/><br/>
    <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password'/><br/>
    <button type='submit'>Register</button></form>{error&&<p style={{color:'red'}}>{error}</p>}</div>);
}
