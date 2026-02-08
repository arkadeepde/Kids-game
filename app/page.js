import Link from 'next/link'

export default function Home() {
  return (
    <div style={{width: '100%', maxWidth: 900, margin: '0 auto'}}>
      <h2 style={{marginBottom:12}}>Tap & Play — Simple games for toddlers</h2>
      <p className="small-note">Big buttons, bright colors, no reading required.</p>

      <div className="card-grid" style={{marginTop:20}}>
        <div className="card">
          <div style={{fontSize:36}}>🎈</div>
          <div style={{marginTop:10}}><Link href="/games/bubble-pop">Bubble Pop</Link></div>
          <div style={{marginTop:8, fontSize:14, opacity:0.9}}>Tap bubbles to pop them — endless fun.</div>
        </div>

        <div className="card">
          <div style={{fontSize:36}}>🎵</div>
          <div style={{marginTop:10}}>Music Board (coming)</div>
          <div style={{marginTop:8, fontSize:14, opacity:0.9}}>Short, simple interactive toy — coming soon.</div>
        </div>

        <div className="card">
          <div style={{fontSize:36}}>🖌️</div>
          <div style={{marginTop:10}}>Rainbow Paint (coming)</div>
          <div style={{marginTop:8, fontSize:14, opacity:0.9}}>A large canvas for scribbling — coming soon.</div>
        </div>
      </div>

    </div>
  )
}
