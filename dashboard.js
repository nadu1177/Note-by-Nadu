import { useEffect,useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
export default function Dashboard(){
  const [user,setUser]=useState(null);
  const [text,setText]=useState('');
  const [notes,setNotes]=useState([]);
  const router=useRouter();
  useEffect(()=>onAuthStateChanged(auth,u=>{if(!u) router.push('/login'); else setUser(u);}),[]);
  useEffect(()=>{if(!user) return; const q=query(collection(db,'notes'),where('uid','==',user.uid));
    return onSnapshot(q,snap=>setNotes(snap.docs.map(d=>({id:d.id,...d.data()}))));},[user]);
  const addNote=async()=>{if(!text.trim())return;
    await addDoc(collection(db,'notes'),{uid:user.uid,text,created:serverTimestamp()});setText('');};
  return user&&(<div style={{padding:'2rem'}}>
    <h2>Your Notes</h2><button onClick={()=>{signOut(auth);router.push('/');}}>Logout</button>
    <div><input value={text} onChange={e=>setText(e.target.value)} placeholder='New note'/><button onClick={addNote}>Add</button></div>
    <ul>{notes.map(n=><li key={n.id}>{n.text}</li>)}</ul></div>);
}
