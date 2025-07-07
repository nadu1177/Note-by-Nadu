import Link from 'next/link';
export default function Home(){
  return(<main style={{padding:'2rem',fontFamily:'sans-serif'}}>
    <h1>Note by Nadu</h1>
    <p>Firebase + Next.js note app.</p>
    <nav><Link href='/signup'>Sign Up</Link>{" | "}<Link href='/login'>Login</Link></nav>
  </main>);
}
