import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "../lib/firebase";
import { ref, onValue, set } from "firebase/database";

const CATS=[
  {id:"produce",l:"Produce",i:"🥬",c:"#4ade80"},{id:"dairy",l:"Dairy",i:"🧀",c:"#fbbf24"},
  {id:"meat",l:"Meat",i:"🥩",c:"#f87171"},{id:"bakery",l:"Bakery",i:"🍞",c:"#d97706"},
  {id:"frozen",l:"Frozen",i:"🧊",c:"#7dd3fc"},{id:"pantry",l:"Pantry",i:"🫙",c:"#c084fc"},
  {id:"bev",l:"Beverages",i:"🥤",c:"#fb923c"},{id:"house",l:"Household",i:"🧹",c:"#a3a3a3"},
  {id:"baby",l:"Baby",i:"👶",c:"#f9a8d4"},{id:"health",l:"Health",i:"💊",c:"#34d399"},
  {id:"other",l:"Other",i:"📦",c:"#94a3b8"},
];
const MICONS=["🍝","🌮","🥘","🍔","🐟","🍗","🍲","🥞","🥗","🍕","🌯","🥩","🍜","🫕","🍱","🥙","🧆","🍛","🥦"];
const DSTORES=["WAL-MART","Kroger","Albertsons","Sam's","Costco","Whole Foods"];
const SC=["#0071ce","#e31837","#0072bc","#0060a9","#d0202e","#00674b","#f59e0b","#8b5cf6"];
const gc=i=>CATS.find(x=>x.id===i)||CATS[10];
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const stc=(ss,n)=>{const i=ss.indexOf(n);return SC[i%SC.length]||"#64748b";};

function useFB(path,data,skip){
  const t=useRef(null);
  useEffect(()=>{if(skip)return;clearTimeout(t.current);t.current=setTimeout(()=>{set(ref(db,path),data).catch(()=>{});},600);return()=>clearTimeout(t.current);},[path,data,skip]);
}

function EI({item,onSave,onCancel,stores}){
  const[n,sN]=useState(item.name);const[q,sQ]=useState(String(item.qty||1));const[un,sU]=useState(item.unit||"");
  const[cat,sCat]=useState(item.category||"other");const[st,sSt]=useState(item.store||stores[0]);
  const[alt,sAlt]=useState(item.altStore||"");const[nt,sNt]=useState(item.notes||"");
  const[ia,sIa]=useState(!!item.inactive);
  return(<div style={Z.er}>
    <input style={Z.ei} value={n} onChange={e=>sN(e.target.value)} placeholder="Item name" autoFocus/>
    <div style={Z.ef}>
      <div><div style={{fontSize:8,color:"#64748b",textAlign:"center"}}>QTY</div><input style={{...Z.ei,width:46,textAlign:"center",fontSize:16,fontWeight:800,padding:"5px 2px"}} type="number" min="1" value={q} onChange={e=>sQ(e.target.value)}/></div>
      <input style={{...Z.ei,flex:1}} value={un} onChange={e=>sU(e.target.value)} placeholder="unit"/>
      <select style={{...Z.es,flex:1}} value={cat} onChange={e=>sCat(e.target.value)}>{CATS.map(ct=><option key={ct.id} value={ct.id}>{ct.i} {ct.l}</option>)}</select>
    </div>
    <div style={Z.ef}>
      <select style={Z.es} value={st} onChange={e=>sSt(e.target.value)}>{stores.map(x=><option key={x} value={x}>{x}</option>)}</select>
      <select style={Z.es} value={alt} onChange={e=>sAlt(e.target.value)}><option value="">No alt</option>{stores.filter(x=>x!==st).map(x=><option key={x} value={x}>{x}</option>)}</select>
    </div>
    <input style={Z.ei} value={nt} onChange={e=>sNt(e.target.value)} placeholder="Notes (optional)"/>
    <label style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:ia?"#f59e0b":"#64748b",margin:"4px 0 6px",cursor:"pointer"}} onClick={()=>sIa(!ia)}>
      <span style={{width:20,height:20,borderRadius:5,border:"2px solid "+(ia?"#f59e0b":"#475569"),background:ia?"#f59e0b":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:700}}>{ia?"✓":""}</span>
      Inactive - not needed every trip
    </label>
    <div style={Z.ea}><button style={Z.sv} onClick={()=>onSave({...item,name:n.trim()||item.name,qty:Math.max(1,parseInt(q)||1),unit:un.trim(),category:cat,store:st,altStore:alt,notes:nt.trim(),inactive:ia,checked:ia?false:item.checked})}>Save</button><button style={Z.cn} onClick={onCancel}>Cancel</button></div>
  </div>);
}

export default function Home(){
  const[list,sList]=useState([]);const​​​​​​​​​​​​​​​​
