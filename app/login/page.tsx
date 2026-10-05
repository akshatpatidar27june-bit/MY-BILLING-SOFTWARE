"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);

  async function submit(e:FormEvent) {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if(!url || !key) throw new Error("Supabase environment variables are not configured.");
      const res=await fetch(url+"/auth/v1/token?grant_type=password",{
        method:"POST",
        headers:{"Content-Type":"application/json",apikey:key},
        body:JSON.stringify({email,password})
      });
      const data=await res.json();
      if(!res.ok) throw new Error(data.error_description || data.msg || "Invalid login.");
      if(data.user?.email?.toLowerCase()!=="akshat@gmail.com") throw new Error("Administrator access only.");
      localStorage.setItem("smartbillz_session",JSON.stringify(data));
      router.replace("/admin");
    } catch(err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally { setBusy(false); }
  }

  return <main className="auth-page">
    <div className="auth-shell">
      <div className="auth-brand"><img src="/SmallSquareLogoJpg.jpg" alt="SMARTBILLZ"/><span>SMARTBILLZ</span></div>
      <div className="auth-card">
        <div className="auth-kicker">CONTROL CENTER</div>
        <h1>Administrator<br/><em>sign in.</em></h1>
        <p>Manage restaurants, subscriptions, outlets, features and revenue from one secure place.</p>
        <form onSubmit={submit}>
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Admin email" required/></label>
          <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required/></label>
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-submit" disabled={busy}>{busy?"Signing in…":"Enter Control Center →"}</button>
        </form>
        <small className="auth-note">SMARTBILLZ administrator access only.</small>
      </div>
    </div>
  </main>;
}
