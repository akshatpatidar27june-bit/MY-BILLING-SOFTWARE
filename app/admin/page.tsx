"use client";

import { useEffect,useMemo,useState } from "react";
import { useRouter } from "next/navigation";

type Restaurant={id:string;name:string;owner_name:string;owner_email:string;owner_phone:string;address:string;gstin:string;status:string;lock_pin?:string};
type Subscription={id:string;restaurant_id:string;plan_name:string;amount:number;starts_on:string;valid_until:string;payment_status:string};
type Outlet={id:string;restaurant_id:string;name:string;capacity:number;status:string};

const plans=["Starter","Business","Professional","Super","Custom"];
const featureNames=["billing","inventory","gst","reports","customers","staff","multi_outlet","advanced_reports","expenses","custom_features"];

async function api(path:string,token:string,options:RequestInit={}) {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!url||!key) throw new Error("Supabase environment variables are missing.");
  const res=await fetch(url+"/rest/v1/"+path,{...options,headers:{apikey:key,Authorization:"Bearer "+token,"Content-Type":"application/json",Prefer:"return=representation",...(options.headers||{})}});
  if(!res.ok) throw new Error(await res.text());
  return res.status===204?null:res.json();
}

export default function AdminPage(){
 const router=useRouter();
 const [token,setToken]=useState("");
 const [restaurants,setRestaurants]=useState<Restaurant[]>([]);
 const [subs,setSubs]=useState<Subscription[]>([]);
 const [outlets,setOutlets]=useState<Outlet[]>([]);
 const [selected,setSelected]=useState<Restaurant|null>(null);
 const [tab,setTab]=useState("overview");
 const [busy,setBusy]=useState(true);
 const [error,setError]=useState("");
 const [showAdd,setShowAdd]=useState(false);
 const [features,setFeatures]=useState<Record<string,boolean>>({});
 const [form,setForm]=useState({name:"",owner_name:"",owner_email:"",owner_password:"",owner_phone:"",address:"",gstin:"",plan_name:"Starter",amount:"10000",valid_until:"",outlet_name:"Main Outlet",capacity:"1"});

 useEffect(()=>{try{const s=JSON.parse(localStorage.getItem("smartbillz_session")||"");if(s.user?.email?.toLowerCase()!=="akshat@gmail.com")throw 0;setToken(s.access_token)}catch{router.replace("/login")}},[router]);
 useEffect(()=>{if(token)refresh()},[token]);

 async function refresh(){setBusy(true);try{
   const [r,s,o]=await Promise.all([api("restaurants?select=*&order=created_at.desc",token),api("subscriptions?select=*",token),api("outlets?select=*",token)]);
   setRestaurants(r||[]);setSubs(s||[]);setOutlets(o||[]);
 }catch{setError("Could not load your Control Center. Check Supabase environment variables and database setup.")}finally{setBusy(false)}}

 async function addRestaurant(){
   try{
    const r=(await api("restaurants",token,{method:"POST",body:JSON.stringify({name:form.name,owner_name:form.owner_name,owner_email:form.owner_email,owner_phone:form.owner_phone,address:form.address,gstin:form.gstin})}))[0];
    const ownerRes=await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL+"/functions/v1/create-restaurant-owner",{method:"POST",headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||"",Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({email:form.owner_email,password:form.owner_password,restaurant_id:r.id})});
    if(!ownerRes.ok){const msg=await ownerRes.text();throw new Error(msg||"Restaurant login creation failed.");}
    const owner=await ownerRes.json();
    await api("restaurants?id=eq."+r.id,token,{method:"PATCH",body:JSON.stringify({owner_user_id:owner.user_id})});
    await api("restaurant_features",token,{method:"POST",body:JSON.stringify({restaurant_id:r.id})});
    await api("subscriptions",token,{method:"POST",body:JSON.stringify({restaurant_id:r.id,plan_name:form.plan_name,amount:Number(form.amount)||0,valid_until:form.valid_until||new Date(Date.now()+31536000000).toISOString().slice(0,10),payment_status:"pending"})});
    await api("outlets",token,{method:"POST",body:JSON.stringify({restaurant_id:r.id,name:form.outlet_name||"Main Outlet",capacity:Number(form.capacity)||1})});
    setShowAdd(false);await refresh();setSelected(r);setTab("overview");
   }catch{setError("Restaurant creation failed.")}
 }

 async function lockRestaurant(r:Restaurant){
   const locked=r.status!=="locked";
   const pin=locked?prompt("Create the PIN that will unlock this restaurant:"):"";
   if(locked&&!pin)return;
   await api("restaurants?id=eq."+r.id,token,{method:"PATCH",body:JSON.stringify({status:locked?"locked":"active",lock_pin:locked?pin:null})});
   await refresh();setSelected({...r,status:locked?"locked":"active",lock_pin:locked?(pin??undefined):undefined});
 }

 async function deleteRestaurant(r:Restaurant){
   const confirmation=prompt(`This permanently deletes ${r.name}, its subscription, outlets, features and owner login. Type DELETE to confirm.`);
   if(confirmation!=="DELETE")return;
   try{
    const res=await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL+"/functions/v1/delete-restaurant",{method:"POST",headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||"",Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({restaurant_id:r.id})});
    if(!res.ok)throw new Error(await res.text());
    if(selected?.id===r.id)setSelected(null);
    await refresh();
   }catch{setError("Restaurant could not be deleted.");}
 }

 async function changePlan(plan:string){
   if(!selected)return;
   const s=subs.find(x=>x.restaurant_id===selected.id);
   if(s)await api("subscriptions?id=eq."+s.id,token,{method:"PATCH",body:JSON.stringify({plan_name:plan})});
   else await api("subscriptions",token,{method:"POST",body:JSON.stringify({restaurant_id:selected.id,plan_name:plan,amount:10000,valid_until:new Date(Date.now()+31536000000).toISOString().slice(0,10),payment_status:"pending"})});
   await refresh();
 }

 async function editSubscription(){
   if(!selected)return;
   const s=subs.find(x=>x.restaurant_id===selected.id); if(!s)return;
   const amount=prompt("Subscription amount",String(s.amount)); if(amount===null)return;
   const until=prompt("Valid until YYYY-MM-DD",s.valid_until); if(until===null)return;
   await api("subscriptions?id=eq."+s.id,token,{method:"PATCH",body:JSON.stringify({amount:Number(amount),valid_until:until})});await refresh();
 }

 async function openFeatures(){
   if(!selected)return;setTab("features");
   const x=await api("restaurant_features?restaurant_id=eq."+selected.id+"&select=*",token);setFeatures(x[0]||{});
 }
 async function saveFeatures(){if(!selected)return;await api("restaurant_features?restaurant_id=eq."+selected.id,token,{method:"PATCH",body:JSON.stringify({...features,restaurant_id:selected.id})});alert("Feature access updated.");}

 const active=restaurants.filter(x=>x.status==="active").length;
 const locked=restaurants.filter(x=>x.status==="locked").length;
 const revenue=subs.reduce((n,x)=>n+Number(x.amount||0),0);
 const selectedSub=selected?subs.find(x=>x.restaurant_id===selected.id):undefined;
 const selectedOutlets=selected?outlets.filter(x=>x.restaurant_id===selected.id):[];

 if(!token||busy)return <div className="admin-loading"><img src="/SmallSquareLogoJpg.jpg"/><span>Opening SMARTBILLZ Control Center…</span></div>;

 return <main className="admin-page">
  <aside className="admin-sidebar">
   <div className="admin-logo"><img src="/SmallSquareLogoJpg.jpg"/><b>SMART<span>BILLZ</span></b></div>
   <small className="admin-side-title">CONTROL CENTER</small>
   <button className={!selected&&tab==="overview"?"active":""} onClick={()=>{setSelected(null);setTab("overview")}}>▦ Overview</button>
   <button onClick={()=>setShowAdd(true)}>＋ Add Restaurant</button>
   <button className={!selected&&tab==="revenue"?"active":""} onClick={()=>{setSelected(null);setTab("revenue")}}>₹ Revenue</button>
   <button className={!selected&&tab==="restaurants"?"active":""} onClick={()=>{setSelected(null);setTab("restaurants")}}>◉ Restaurants</button>
   <div className="admin-sidebar-bottom"><span>Administrator</span><b>Akshat</b><button onClick={()=>{localStorage.removeItem("smartbillz_session");router.replace("/login")}}>Sign out</button></div>
  </aside>

  <section className="admin-main">
   <header className="admin-top"><div><small>SMARTBILLZ / {selected?selected.name:"CONTROL CENTER"}</small><h1>{selected?selected.name:"Control Center"}</h1></div><button className="admin-add" onClick={()=>setShowAdd(true)}>＋ New Restaurant</button></header>
   {error&&<div className="admin-error">{error}</div>}

   {!selected&&tab==="overview"&&<><div className="metric-grid"><Metric title="Restaurants" value={restaurants.length} note="Total businesses"/><Metric title="Active" value={active} note="Running normally"/><Metric title="Locked" value={locked} note="Access stopped"/><Metric title="Revenue" value={"₹"+revenue.toLocaleString("en-IN")} note="Recorded subscription value"/></div><SectionTitle title="Your restaurants" action={()=>setShowAdd(true)}/><div className="restaurant-grid">{restaurants.map(r=><RestaurantCard key={r.id} r={r} sub={subs.find(s=>s.restaurant_id===r.id)} outlets={outlets.filter(o=>o.restaurant_id===r.id)} open={()=>setSelected(r)} lock={()=>lockRestaurant(r)} deleteRestaurant={()=>deleteRestaurant(r)}/>)}</div>{!restaurants.length&&<div className="empty-admin">No restaurants yet. Create your first business.</div>}</>}

   {!selected&&tab==="restaurants"&&<><SectionTitle title="Restaurant management"/><div className="restaurant-grid">{restaurants.map(r=><RestaurantCard key={r.id} r={r} sub={subs.find(s=>s.restaurant_id===r.id)} outlets={outlets.filter(o=>o.restaurant_id===r.id)} open={()=>setSelected(r)} lock={()=>lockRestaurant(r)}/>)}</div></>}

   {!selected&&tab==="revenue"&&<><div className="metric-grid"><Metric title="Total" value={"₹"+revenue.toLocaleString("en-IN")} note="Subscription value"/><Metric title="Paid" value={subs.filter(x=>x.payment_status==="paid").length} note="Paid subscriptions"/><Metric title="Pending" value={subs.filter(x=>x.payment_status!=="paid").length} note="Follow-up needed"/></div><div className="table-card"><div className="table-head"><b>Subscription ledger</b><span>Restaurant · plan · amount · validity</span></div>{subs.map(s=><div className="ledger-row" key={s.id}><b>{restaurants.find(r=>r.id===s.restaurant_id)?.name||"Restaurant"}</b><span>{s.plan_name}</span><strong>₹{Number(s.amount).toLocaleString("en-IN")}</strong><span>{s.valid_until}</span><em>{s.payment_status}</em></div>)}</div></>}

   {selected&&<><button className="back-admin" onClick={()=>setSelected(null)}>← Back to restaurants</button><div className="detail-hero"><div><span className={"status "+(selected.status==="locked"?"locked":"")}>{selected.status}</span><h2>{selected.name}</h2><p>{selected.owner_name||"Owner"} · {selected.owner_phone||"No phone"} · {selected.owner_email||"No email"}</p></div><div className="detail-actions"><button className={selected.status==="locked"?"unlock-btn":"lock-btn"} onClick={()=>lockRestaurant(selected)}>{selected.status==="locked"?"🔓 Unlock":"🔒 Lock software"}</button><button className="delete-admin" onClick={()=>deleteRestaurant(selected)}>Delete restaurant</button></div></div><div className="detail-tabs">{["overview","subscription","features","outlets","customize"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>x==="features"?openFeatures():setTab(x)}>{x}</button>)}</div>
   {tab==="overview"&&<div className="detail-cards"><Info title="Plan" value={selectedSub?.plan_name||"—"} note={selectedSub?"₹"+Number(selectedSub.amount).toLocaleString("en-IN"):"No subscription"}/><Info title="Valid until" value={selectedSub?.valid_until||"—"} note="Subscription control"/><Info title="Outlets" value={String(selectedOutlets.length)} note={selectedOutlets.filter(x=>x.status==="active").length+" active"}/><Info title="GSTIN" value={selected.gstin||"—"} note="Business details"/></div>}
   {tab==="subscription"&&<div className="control-panel"><h3>Subscription control</h3><p>Plan, amount and validity are controlled independently.</p><div className="plan-pills">{plans.map(p=><button className={selectedSub?.plan_name===p?"active":""} key={p} onClick={()=>changePlan(p)}>{p}</button>)}</div><button className="primary-admin" onClick={editSubscription}>Edit amount & validity</button></div>}
   {tab==="features"&&<div className="control-panel"><h3>Feature control</h3><p>Enable extra modules even when the customer is on a lower plan.</p><div className="feature-switch-grid">{featureNames.map(k=><label key={k}><span>{k.replaceAll("_"," ")}</span><input type="checkbox" checked={!!features[k]} onChange={e=>setFeatures({...features,[k]:e.target.checked})}/></label>)}</div><button className="primary-admin" onClick={saveFeatures}>Save feature access</button></div>}
   {tab==="outlets"&&<div className="control-panel"><h3>Outlet management</h3><p>Add outlets, set capacity and temporarily stop them.</p><div className="outlet-list">{selectedOutlets.map(o=><div key={o.id}><b>{o.name}</b><span>Capacity {o.capacity}</span><button onClick={async()=>{await api("outlets?id=eq."+o.id,token,{method:"PATCH",body:JSON.stringify({status:o.status==="active"?"stopped":"active"})});refresh()}}>{o.status==="active"?"Stop":"Activate"}</button></div>)}</div><button className="primary-admin" onClick={async()=>{const name=prompt("Outlet name");if(!name)return;const capacity=prompt("Outlet capacity","1");await api("outlets",token,{method:"POST",body:JSON.stringify({restaurant_id:selected.id,name,capacity:Number(capacity)||1})});refresh()}}>＋ Add outlet</button></div>}
   {tab==="customize"&&<div className="control-panel"><h3>Restaurant customization</h3><p>Each restaurant can have its own POS identity, text and business information.</p><div className="custom-grid"><label>POS header<input placeholder={selected.name}/></label><label>Welcome text<input placeholder="Welcome to our restaurant"/></label><label>Invoice footer<input placeholder="Thank you for visiting"/></label><label>Phone<input placeholder={selected.owner_phone||""}/></label><label>Address<input placeholder={selected.address||""}/></label><label>GSTIN<input placeholder={selected.gstin||""}/></label></div><button className="primary-admin">Save customization</button></div>}
   </>}
  </section>

  {showAdd&&<div className="modal-backdrop"><div className="admin-modal"><button className="modal-close" onClick={()=>setShowAdd(false)}>×</button><small>NEW BUSINESS</small><h2>Add restaurant</h2><p>Create business details, subscription and first outlet.</p><div className="form-grid">{(["name","owner_name","owner_email","owner_phone","address","gstin","outlet_name","capacity"] as const).map(k=><label key={k}>{k.replaceAll("_"," ")}<input value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></label>)}<label>Owner login password<input type="password" minLength={8} value={form.owner_password} onChange={e=>setForm({...form,owner_password:e.target.value})}/><small>Used by the restaurant owner to sign in.</small></label></div><div className="modal-plan"><label>Plan<select value={form.plan_name} onChange={e=>setForm({...form,plan_name:e.target.value})}>{plans.map(x=><option key={x}>{x}</option>)}</select></label><label>Amount<input value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/></label><label>Valid until<input type="date" value={form.valid_until} onChange={e=>setForm({...form,valid_until:e.target.value})}/></label></div><button className="primary-admin wide" onClick={addRestaurant}>Create restaurant →</button></div></div>}
 </main>
}

function Metric({title,value,note}:{title:string;value:string|number;note:string}){return <div><span>{title}</span><strong>{value}</strong><small>{note}</small></div>}
function SectionTitle({title,action}:{title:string;action?:()=>void}){return <div className="admin-section-head"><div><small>BUSINESS CONTROL</small><h2>{title}</h2></div>{action&&<button onClick={action}>Add new →</button>}</div>}
function Info({title,value,note}:{title:string;value:string;note:string}){return <div className="info-card"><span>{title}</span><strong>{value}</strong><small>{note}</small></div>}
function RestaurantCard({r,sub,outlets,open,lock}:{r:Restaurant;sub?:Subscription;outlets:Outlet[];open:()=>void;lock:()=>void;deleteRestaurant:()=>void}){return <article className="restaurant-card"><div className="card-top"><span className={"status "+(r.status==="locked"?"locked":"")}>{r.status}</span><button onClick={lock}>{r.status==="locked"?"Unlock":"Lock"}</button></div><h3>{r.name}</h3><p>{r.owner_name||"Owner not set"}</p><div className="card-stats"><span><b>{outlets.length}</b> outlets</span><span><b>{sub?.plan_name||"—"}</b> plan</span><span><b>{sub?.valid_until||"—"}</b> valid</span></div><div className="card-actions"><button className="open-card" onClick={open}>Open control →</button><button className="delete-card" onClick={(e)=>{e.stopPropagation();deleteRestaurant();}}>Delete</button></div></article>}
