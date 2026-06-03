import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  LayoutDashboard, Navigation2, Users, CreditCard, Car,
  Building2, Star, Bell, FileText, BarChart2, QrCode,
  Cloud, MessageCircle, Settings, UserCircle, ChevronDown,
  Phone, Mail, Eye, Map
} from "lucide-react";

/* ─── DESIGN TOKENS ────────────────────────────────────────── */
const BG      = "#080f1e";
const CARD    = "#0d1a2e";
const BORDER  = "#1a2d4a";
const SIDEBAR = "#070d1a";
const BLUE    = "#2196f3";
const GREEN   = "#4caf50";
const AMBER   = "#ff9800";
const RED     = "#f44336";
const PURPLE  = "#9c27b0";
const PINK    = "#e91e63";
const CYAN    = "#00bcd4";
const TXT1    = "#e8edf5";
const TXT2    = "#7a90aa";
const TXT3    = "#4a6080";

/* ─── DATA ──────────────────────────────────────────────────── */
const budgetSlices = [
  { name:"Transport", pct:30, amt:720,  color:BLUE   },
  { name:"Food",      pct:25, amt:600,  color:GREEN  },
  { name:"Activities",pct:20, amt:480,  color:AMBER  },
  { name:"Shopping",  pct:15, amt:360,  color:PINK   },
  { name:"Others",    pct:10, amt:240,  color:PURPLE },
];

const weekExpenses = [
  {d:"Mon",v:280},{d:"Tue",v:320},{d:"Wed",v:380},
  {d:"Thu",v:350},{d:"Fri",v:400},{d:"Sat",v:220},{d:"Sun",v:180},
];

const budgetVsActual = [
  {dt:"May 12",actual:0,   budget:0   },
  {dt:"May 14",actual:380, budget:533 },
  {dt:"May 16",actual:760, budget:800 },
  {dt:"May 18",actual:1100,budget:1067},
  {dt:"May 19",actual:1320,budget:1200},
  {dt:"May 22",actual:1500,budget:1600},
  {dt:"May 26",actual:1600,budget:2400},
];

const navItems = [
  { Icon:LayoutDashboard, label:"Dashboard",          active:true  },
  { Icon:Navigation2,     label:"Trips"                            },
  { Icon:Users,           label:"Travelers"                        },
  { Icon:CreditCard,      label:"Expenses & Budget"                },
  { Icon:Car,             label:"Transport"                        },
  { Icon:Building2,       label:"Accommodations"                   },
  { Icon:Star,            label:"Attractions & Events"             },
  { Icon:Bell,            label:"Alerts Center"                    },
  { Icon:FileText,        label:"Documents"                        },
  { Icon:BarChart2,       label:"Reports & Analytics"              },
  { Icon:QrCode,          label:"QR Code Scanner"                  },
  { Icon:Cloud,           label:"Weather"                          },
  { Icon:MessageCircle,   label:"Chat & Support"                   },
  { Icon:Settings,        label:"Settings"                         },
  { Icon:UserCircle,      label:"User Management"                  },
];

const itinerary = [
  { t:"09:00", title:"Breakfast",     sub:"Café de Flore",    status:"Completed",  sc:GREEN },
  { t:"10:30", title:"City tour",     sub:"Le Marais",         status:"Completed",  sc:GREEN },
  { t:"13:00", title:"Lunch",         sub:"Chez Janou",        status:"In Progress",sc:BLUE  },
  { t:"15:30", title:"Louvre Museum", sub:"Visit",             status:"Upcoming",   sc:TXT3  },
  { t:"18:00", title:"Seine Cruise",  sub:"Bateaux Parisiens", status:"Upcoming",   sc:TXT3  },
];

const catTable = [
  { cat:"Transport", budget:720,  actual:680, rem:40,  pct:94 },
  { cat:"Food",      budget:600,  actual:420, rem:180, pct:70 },
  { cat:"Activities",budget:480,  actual:320, rem:160, pct:67 },
  { cat:"Shopping",  budget:360,  actual:120, rem:240, pct:33 },
  { cat:"Others",    budget:240,  actual:60,  rem:180, pct:25 },
];

const alerts = [
  { time:"14:20", type:"Info",    desc:"Flight AF123 on time",    color:BLUE  },
  { time:"13:45", type:"Warning", desc:"High spending in Food",   color:AMBER },
  { time:"12:30", type:"Info",    desc:"Check-in reminder",       color:BLUE  },
  { time:"09:15", type:"Success", desc:"Hotel booked",            color:GREEN },
  { time:"08:00", type:"Info",    desc:"Weather alert",           color:BLUE  },
];

const destinations = [
  { dest:"Paris",     vis:542 },
  { dest:"Rome",      vis:312 },
  { dest:"Barcelona", vis:298 },
  { dest:"Amsterdam", vis:245 },
  { dest:"Prague",    vis:198 },
];

/* ─── HELPERS ───────────────────────────────────────────────── */
function pctColor(p) {
  if (p >= 90) return RED;
  if (p >= 65) return AMBER;
  return GREEN;
}

/* ─── MAP SVG ────────────────────────────────────────────────── */
function TrackingMap() {
  return (
    <svg viewBox="0 0 360 200" style={{width:"100%",height:"100%",borderRadius:4}}>
      <defs>
        <radialGradient id="mg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d2545"/>
          <stop offset="100%" stopColor="#081525"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="360" height="200" fill="url(#mg)"/>
      {/* grid */}
      {[0,1,2,3].map(i=><line key={`h${i}`} x1="0" y1={i*50+25} x2="360" y2={i*50+25} stroke={BORDER} strokeWidth="0.5"/>)}
      {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*60+30} x2={i*60+30} y1="0" y2="200" stroke={BORDER} strokeWidth="0.5"/>)}
      {/* Western Europe landmass simplified */}
      <path d="M70,30 L100,22 L130,18 L160,20 L185,15 L210,20 L230,18 L255,25 L270,40 L275,60 L270,85 L260,105 L250,125 L240,145 L230,160 L215,170 L200,178 L185,180 L170,175 L155,168 L145,155 L138,140 L130,125 L120,110 L110,95 L100,80 L88,65 L75,50 Z"
        fill="#1a3555" stroke="#2a5080" strokeWidth="1.2"/>
      {/* Spain */}
      <path d="M88,115 L120,110 L145,115 L155,130 L150,155 L130,165 L105,160 L85,148 L80,132 Z"
        fill="#152d48" stroke="#1e4070" strokeWidth="0.8"/>
      {/* Italy boot hint */}
      <path d="M210,100 L225,108 L235,125 L230,145 L225,165 L218,175 L210,155 L205,135 L205,115 Z"
        fill="#152d48" stroke="#1e4070" strokeWidth="0.8"/>
      {/* Route: Paris → Lyon (dashed animated) */}
      <line x1="168" y1="60" x2="185" y2="110"
        stroke={BLUE} strokeWidth="2.5" strokeDasharray="6,4" strokeLinecap="round"
        style={{animation:"dash 2s linear infinite"}}/>
      {/* Paris */}
      <circle cx="168" cy="60" r="10" fill="none" stroke={CYAN} strokeWidth="1" opacity="0.3"
        style={{animation:"pulse 2s ease-in-out infinite"}}/>
      <circle cx="168" cy="60" r="6" fill={CYAN} stroke="white" strokeWidth="1.5" filter="url(#glow)"/>
      <text x="178" y="56" fill={TXT1} fontSize="9" fontWeight="700">Paris</text>
      {/* Current position dot */}
      <circle cx="178" cy="85" r="4" fill={GREEN} stroke="white" strokeWidth="1.5" filter="url(#glow)"/>
      {/* Lyon */}
      <circle cx="185" cy="110" r="6" fill={AMBER} stroke="white" strokeWidth="1.5"/>
      <text x="195" y="115" fill={TXT1} fontSize="9" fontWeight="700">Lyon</text>
      {/* Zoom controls */}
      <rect x="8" y="8" width="20" height="20" rx="3" fill={CARD} stroke={BORDER}/>
      <text x="18" y="22" fill={TXT1} fontSize="14" textAnchor="middle" fontWeight="300">+</text>
      <rect x="8" y="32" width="20" height="20" rx="3" fill={CARD} stroke={BORDER}/>
      <text x="18" y="46" fill={TXT1} fontSize="14" textAnchor="middle" fontWeight="300">−</text>
      <style>{`
        @keyframes dash { to { stroke-dashoffset: -20; } }
        @keyframes pulse { 0%,100%{r:8;opacity:0.4} 50%{r:14;opacity:0.1} }
      `}</style>
    </svg>
  );
}

/* ─── HEALTH GAUGE ───────────────────────────────────────────── */
function HealthGauge({ val=96 }) {
  const cx=80, cy=80, r=56;
  const toRad = d => (d * Math.PI) / 180;
  const startDeg = 145;
  const spanDeg  = 250;
  const fillDeg  = (val / 100) * spanDeg;

  const arcPath = (fromDeg, toDeg, radius) => {
    const s = { x: cx + radius * Math.cos(toRad(fromDeg)), y: cy + radius * Math.sin(toRad(fromDeg)) };
    const e = { x: cx + radius * Math.cos(toRad(toDeg)),   y: cy + radius * Math.sin(toRad(toDeg))   };
    const large = (toDeg - fromDeg) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const trackEnd = startDeg + spanDeg;
  const fillEnd  = startDeg + fillDeg;

  return (
    <svg width="160" height="110" viewBox="0 0 160 110" style={{display:"block",margin:"0 auto"}}>
      <path d={arcPath(startDeg, trackEnd, r)} fill="none" stroke="#1a2d4a" strokeWidth="11" strokeLinecap="round"/>
      <path d={arcPath(startDeg, fillEnd,  r)} fill="none" stroke={GREEN}   strokeWidth="11" strokeLinecap="round"/>
      <text x="80" y="82" textAnchor="middle" fill={TXT1} fontSize="26" fontWeight="800">{val}</text>
      <text x="80" y="97" textAnchor="middle" fill={TXT2} fontSize="9">out of 100</text>
    </svg>
  );
}

/* ─── QR CODE ────────────────────────────────────────────────── */
function MiniQR() {
  const rows = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1],
    [0,1,0,0,1,0,0,1,0,1,1,0,1,0,1,0,0,1,0],
    [1,1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1],
    [0,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,1,0,1,0,0,0,0,1,0],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0],
    [1,1,1,1,1,1,1,0,1,0,0,1,0,0,0,1,1,0,1],
  ];
  const sz = 4;
  return (
    <svg viewBox={`0 0 ${19*sz} ${19*sz}`} width="72" height="72" style={{display:"block",margin:"0 auto"}}>
      <rect width={19*sz} height={19*sz} fill="white"/>
      {rows.map((row,ri)=>row.map((cell,ci)=>
        cell ? <rect key={`${ri}-${ci}`} x={ci*sz} y={ri*sz} width={sz} height={sz} fill="black"/> : null
      ))}
    </svg>
  );
}

/* ─── CARD ───────────────────────────────────────────────────── */
function Card({title, children, style={}}) {
  return (
    <div style={{background:CARD, border:`1px solid ${BORDER}`, borderRadius:6, padding:10, ...style}}>
      {title && <div style={{color:TXT3,fontSize:"9px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:8}}>{title}</div>}
      {children}
    </div>
  );
}

/* ─── CLOCK ──────────────────────────────────────────────────── */
function useClock() {
  const [t, setT] = useState(() => new Date().toLocaleTimeString("fr-FR"));
  useEffect(() => {
    const id = setInterval(() => setT(new Date().toLocaleTimeString("fr-FR")), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function QuetzalcoatlTracker() {
  const clock = useClock();

  const ttip = {
    contentStyle:{background:CARD,border:`1px solid ${BORDER}`,borderRadius:4,color:TXT1,fontSize:10},
    cursor:{fill:"rgba(255,255,255,0.03)"},
  };

  return (
    <div style={{display:"flex",height:"100vh",background:BG,color:TXT1,fontFamily:'"Inter",sans-serif',fontSize:12,overflow:"hidden"}}>

      {/* ── SIDEBAR ── */}
      <aside style={{width:180,minWidth:180,background:SIDEBAR,borderRight:`1px solid ${BORDER}`,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* logo */}
        <div style={{padding:"12px 10px",borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:32,height:32,borderRadius:"50%",overflow:"hidden",flexShrink:0,background:"linear-gradient(135deg,#003399 50%,#ffcc00 50%)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🇪🇺</div>
          <div>
            <div style={{fontSize:"9px",fontWeight:800,letterSpacing:"1.5px",color:TXT1,lineHeight:1}}>QUETZALCOATL</div>
            <div style={{fontSize:"9px",fontWeight:800,letterSpacing:"1px",color:BLUE,lineHeight:1.2}}>TRACKER</div>
            <div style={{fontSize:"7px",color:TXT3,letterSpacing:"0.5px",marginTop:1}}>EUROPE TRAVEL OPERATIONS</div>
          </div>
        </div>

        {/* nav */}
        <div style={{padding:"6px 0",flex:1,overflowY:"auto"}}>
          <div style={{padding:"5px 10px 3px",color:TXT3,fontSize:"9px",letterSpacing:"1px",fontWeight:700}}>NAVIGATION</div>
          {navItems.map(({Icon,label,active},i) => (
            <div key={i} style={{
              display:"flex",alignItems:"center",gap:7,padding:"6px 10px",cursor:"pointer",
              background: active ? "linear-gradient(90deg,#1a4a9022,#1a3a7011)" : "transparent",
              borderLeft: active ? `2px solid ${BLUE}` : "2px solid transparent",
              color: active ? TXT1 : TXT2,
            }}>
              <Icon size={12}/>
              <span style={{fontSize:11}}>{label}</span>
            </div>
          ))}
        </div>

        {/* QR */}
        <div style={{padding:"8px 10px",borderTop:`1px solid ${BORDER}`}}>
          <div style={{color:TXT3,fontSize:"9px",letterSpacing:"1px",marginBottom:6,fontWeight:700}}>QUICK ACCESS</div>
          <div style={{background:"white",borderRadius:4,padding:3,width:78,margin:"0 auto"}}>
            <MiniQR/>
          </div>
          <div style={{color:TXT3,fontSize:"9px",textAlign:"center",marginTop:5}}>Scan profile access</div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

        {/* ── HEADER ── */}
        <header style={{background:SIDEBAR,borderBottom:`1px solid ${BORDER}`,padding:"0 12px",display:"flex",alignItems:"center",gap:8,height:52,flexShrink:0}}>
          <div style={{fontSize:10,letterSpacing:"0.5px",color:TXT2,whiteSpace:"nowrap"}}>
            <span style={{color:BLUE,fontWeight:700}}>OPERATIONS CONTROL</span>
            <span style={{color:TXT3}}> • MONITORING • INSIGHTS • REAL-TIME TRACKING</span>
          </div>
          <div style={{flex:1}}/>
          {[
            {emoji:"🗺️", val:"32",      lbl:"ACTIVE TRIPS",  c:BLUE },
            {emoji:"👥", val:"1,821",   lbl:"TRAVELERS",     c:PURPLE},
            {emoji:"📊", val:"91.7%",   lbl:"ON SCHEDULE",   c:GREEN},
            {emoji:"🔔", val:"28",      lbl:"ALERTS",        c:AMBER},
            {emoji:"🕐", val:clock,     lbl:"LOCAL TIME",    c:CYAN },
          ].map(({emoji,val,lbl,c},i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:6,background:CARD,border:`1px solid ${BORDER}`,borderRadius:5,padding:"4px 9px",flexShrink:0}}>
              <span style={{fontSize:14}}>{emoji}</span>
              <div>
                <div style={{color:c,fontWeight:700,fontSize:13,lineHeight:1}}>{val}</div>
                <div style={{color:TXT3,fontSize:"8px",letterSpacing:"0.3px"}}>{lbl}</div>
              </div>
            </div>
          ))}
          <div style={{display:"flex",alignItems:"center",gap:7,background:CARD,border:`1px solid ${BORDER}`,borderRadius:5,padding:"4px 9px",cursor:"pointer",flexShrink:0}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:BLUE,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>👤</div>
            <div>
              <div style={{color:TXT1,fontSize:11,fontWeight:600,lineHeight:1}}>SYSTEM ADMIN</div>
              <div style={{color:TXT2,fontSize:9}}>Administrator</div>
            </div>
            <ChevronDown size={11} color={TXT2}/>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main style={{flex:1,overflowY:"auto",padding:8,display:"flex",flexDirection:"column",gap:8}}>

          {/* ROW 1 */}
          <div style={{display:"grid",gridTemplateColumns:"220px 1fr 240px 220px",gap:8}}>

            {/* Traveler Overview */}
            <Card title="Traveler Overview">
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <div style={{width:60,height:72,borderRadius:4,background:"#1a3050",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,overflow:"hidden"}}>🧑‍💼</div>
                <div style={{flex:1}}>
                  <div style={{color:TXT1,fontWeight:700,fontSize:13,marginBottom:4}}>Sophie Martin</div>
                  {[["EU Citizen","7X9L"],["Member since","03/05/2024"],["Trips","3"],["Status","Active"]].map(([k,v],i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:2}}>
                      <span style={{color:TXT2}}>{k}</span>
                      <span style={{color: k==="Status" ? GREEN : TXT1, fontWeight: k==="Status" ? 600 : 400}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-around",borderTop:`1px solid ${BORDER}`,paddingTop:8}}>
                {[[<Mail size={14}/>, "Message"],[<Phone size={14}/>, "Call"],[<Eye size={14}/>, "View Profile"]].map(([icon,lbl],i)=>(
                  <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",color:TXT2,fontSize:"9px"}}>
                    {icon}<span>{lbl}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Real-Time Tracking */}
            <Card title="Real-Time Tracking">
              <div style={{display:"grid",gridTemplateColumns:"1fr 148px",gap:8,height:"calc(100% - 20px)"}}>
                <div style={{borderRadius:4,overflow:"hidden",minHeight:145}}>
                  <TrackingMap/>
                </div>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                  <div>
                    {[["From","Paris, France"],["To","Lyon, France"],["Distance","465 km"],["Travel time","4h 35m"],["Est. arrival","19:15"],["Status","En Route"]].map(([k,v],i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:10}}>
                        <span style={{color:TXT2}}>{k}</span>
                        <span style={{color: k==="Status" ? AMBER : TXT1, fontWeight: k==="Status" ? 600 : 400}}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{width:"100%",background:BLUE,border:"none",borderRadius:4,color:"white",fontSize:10,padding:"6px 4px",cursor:"pointer",fontWeight:700,letterSpacing:"0.5px"}}>
                    DETAILS & ROUTE
                  </button>
                </div>
              </div>
            </Card>

            {/* Budget Status */}
            <Card title="Budget Status">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{position:"relative",width:95,height:95,flexShrink:0}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{v:66.7},{v:33.3}]} cx="50%" cy="50%" innerRadius={30} outerRadius={44}
                        dataKey="v" startAngle={90} endAngle={-270} stroke="none">
                        <Cell fill={BLUE}/>
                        <Cell fill={BORDER}/>
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",pointerEvents:"none"}}>
                    <div style={{color:TXT1,fontSize:12,fontWeight:800,lineHeight:1}}>66.7%</div>
                    <div style={{color:TXT2,fontSize:"7px",lineHeight:1.2}}>of budget<br/>used</div>
                  </div>
                </div>
                <div style={{flex:1}}>
                  {[{lbl:"Used",val:"€1,600",c:BLUE},{lbl:"Remaining",val:"€800",c:GREEN},{lbl:"Saved",val:"€150",c:AMBER},{lbl:"Over budget",val:"-",c:RED}].map((r,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",borderBottom:`1px solid ${BORDER}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:4}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:r.c}}/>
                        <span style={{color:TXT2,fontSize:10}}>{r.lbl}</span>
                      </div>
                      <span style={{color:TXT1,fontSize:10,fontWeight:600}}>{r.val}</span>
                    </div>
                  ))}
                  <div style={{color:BLUE,fontSize:"9px",marginTop:5,cursor:"pointer"}}>View details</div>
                </div>
              </div>
            </Card>

            {/* Today's Itinerary */}
            <Card title="Today's Itinerary">
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {itinerary.map((item,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:7}}>
                    <div style={{width:30,height:30,borderRadius:"50%",background:"#1a2d4a",border:`2px solid ${item.sc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",color:item.sc,flexShrink:0,fontWeight:700}}>{item.t.slice(0,5)}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{color:TXT1,fontSize:10,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.title}</div>
                      <div style={{color:TXT2,fontSize:"9px"}}>{item.sub}</div>
                    </div>
                    <div style={{background:item.sc+"22",color:item.sc,fontSize:"8px",padding:"2px 5px",borderRadius:3,whiteSpace:"nowrap",flexShrink:0}}>{item.status}</div>
                  </div>
                ))}
              </div>
              <button style={{width:"100%",background:"transparent",border:`1px solid ${BORDER}`,borderRadius:4,color:TXT2,fontSize:10,padding:"5px",cursor:"pointer",marginTop:8,letterSpacing:"0.5px"}}>
                FULL ITINERARY
              </button>
            </Card>
          </div>

          {/* ROW 2 */}
          <div style={{display:"grid",gridTemplateColumns:"190px 1fr 1fr 190px 160px",gap:8}}>

            {/* Budget Breakdown */}
            <Card title="Budget Breakdown">
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{position:"relative",width:130,height:130}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={budgetSlices} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="pct" stroke="none">
                        {budgetSlices.map((d,i)=><Cell key={i} fill={d.color}/>)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",pointerEvents:"none"}}>
                    <div style={{color:TXT1,fontSize:13,fontWeight:800}}>€2,400</div>
                    <div style={{color:TXT2,fontSize:"8px"}}>Total</div>
                  </div>
                </div>
                {budgetSlices.map((d,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",width:"100%",padding:"2px 0",fontSize:"9px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <div style={{width:7,height:7,background:d.color,borderRadius:1}}/>
                      <span style={{color:TXT2}}>{d.name} {d.pct}%</span>
                    </div>
                    <span style={{color:TXT1}}>€{d.amt}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Expenses Over Time */}
            <Card title="Expenses Over Time">
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:4}}>
                <div style={{background:BORDER,borderRadius:3,padding:"2px 7px",fontSize:"9px",color:TXT2,cursor:"pointer"}}>This week ▾</div>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={weekExpenses} barSize={22} margin={{top:0,right:4,left:-20,bottom:0}}>
                  <XAxis dataKey="d" tick={{fill:TXT2,fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:TXT2,fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>`€${v}`}/>
                  <Tooltip {...ttip} formatter={v=>[`€${v}`,"Expenses"]}/>
                  <Bar dataKey="v" fill={BLUE} radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Budget vs Actual */}
            <Card title="Budget VS Actual">
              <div style={{color:TXT1,fontSize:18,fontWeight:800,lineHeight:1}}>€1,600.28</div>
              <div style={{color:TXT2,fontSize:10,marginBottom:6}}>Spent so far</div>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={budgetVsActual} margin={{top:0,right:4,left:-20,bottom:0}}>
                  <XAxis dataKey="dt" tick={{fill:TXT2,fontSize:8}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:TXT2,fontSize:8}} axisLine={false} tickLine={false} tickFormatter={v=>`€${v}`}/>
                  <Tooltip {...ttip}/>
                  <Line type="monotone" dataKey="actual" stroke={BLUE} strokeWidth={2} dot={false} name="Actual"/>
                  <Line type="monotone" dataKey="budget" stroke={GREEN} strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="Budget"/>
                  <Legend wrapperStyle={{fontSize:10,color:TXT2}} iconType="line"/>
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Transportation */}
            <Card title="Transportation">
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{fontSize:22}}>🚗</div>
                <div>
                  <div style={{color:TXT1,fontSize:12,fontWeight:700}}>Car Rental</div>
                  <div style={{color:TXT2,fontSize:10}}>Peugeot 308</div>
                  <div style={{background:GREEN+"22",color:GREEN,fontSize:"8px",padding:"1px 5px",borderRadius:3,display:"inline-block",marginTop:2}}>Active</div>
                </div>
              </div>
              {/* Car illustration */}
              <div style={{textAlign:"center",padding:"6px 0"}}>
                <svg viewBox="0 0 180 70" style={{width:"100%",height:55}}>
                  {/* body */}
                  <rect x="10" y="25" width="160" height="28" rx="6" fill="#1a4080"/>
                  {/* roof */}
                  <path d="M55,25 L75,8 L120,8 L140,25 Z" fill="#2196f3" opacity="0.8"/>
                  {/* windows */}
                  <rect x="77" y="10" width="40" height="14" rx="2" fill="#0d2545" opacity="0.8"/>
                  <line x1="98" y1="10" x2="98" y2="24" stroke="#1a4080" strokeWidth="1.5"/>
                  {/* wheels */}
                  <circle cx="45" cy="53" r="12" fill="#0a1525" stroke="#2a4060" strokeWidth="2"/>
                  <circle cx="45" cy="53" r="6" fill="#1a3050"/>
                  <circle cx="135" cy="53" r="12" fill="#0a1525" stroke="#2a4060" strokeWidth="2"/>
                  <circle cx="135" cy="53" r="6" fill="#1a3050"/>
                  {/* headlights */}
                  <rect x="162" y="30" width="8" height="6" rx="2" fill="#ffcc44" opacity="0.7"/>
                  <rect x="10"  y="30" width="8" height="6" rx="2" fill="#ff4444" opacity="0.6"/>
                </svg>
              </div>
              {[["Pick-up","May 12"],["Drop-off","Paris, CDG"]].map(([k,v],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3}}>
                  <span style={{color:TXT2}}>{k}</span>
                  <span style={{color:TXT1}}>{v}</span>
                </div>
              ))}
              <button style={{width:"100%",background:"transparent",border:`1px solid ${BORDER}`,borderRadius:4,color:TXT2,fontSize:10,padding:5,cursor:"pointer",marginTop:6}}>
                VIEW DETAILS
              </button>
            </Card>

            {/* Trip Health Score */}
            <Card title="Trip Health Score">
              <HealthGauge val={96}/>
              <div style={{display:"flex",flexDirection:"column",gap:3,marginTop:4}}>
                {[{lbl:"Excellent",range:"80-100",c:GREEN},{lbl:"Good",range:"60-79",c:"#8bc34a"},{lbl:"Fair",range:"40-59",c:AMBER},{lbl:"Poor",range:"0-39",c:RED}].map((r,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:4}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:r.c,flexShrink:0}}/>
                    <span style={{color:TXT2,fontSize:"9px",flex:1}}>{r.lbl}</span>
                    <span style={{color:TXT3,fontSize:"9px"}}>{r.range}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ROW 3 */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 240px 185px 185px 170px",gap:8}}>

            {/* Expenses by Category Table */}
            <Card title="Expenses by Category">
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
                <thead>
                  <tr>
                    {["CATEGORY","BUDGET","ACTUAL","REMAINING","% USED"].map(h=>(
                      <th key={h} style={{padding:"4px 6px",color:TXT3,fontSize:"9px",textAlign: h==="CATEGORY" ? "left" : "right",borderBottom:`1px solid ${BORDER}`,fontWeight:700,letterSpacing:"0.5px"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {catTable.map((r,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${BORDER}`}}>
                      <td style={{padding:"5px 6px",color:TXT1}}>{r.cat}</td>
                      <td style={{padding:"5px 6px",textAlign:"right",color:TXT1}}>€{r.budget}</td>
                      <td style={{padding:"5px 6px",textAlign:"right",color:TXT1}}>€{r.actual}</td>
                      <td style={{padding:"5px 6px",textAlign:"right",color:TXT1}}>€{r.rem}</td>
                      <td style={{padding:"5px 6px",textAlign:"right"}}>
                        <span style={{background:pctColor(r.pct)+"22",color:pctColor(r.pct),padding:"2px 7px",borderRadius:3,fontWeight:700}}>{r.pct}%</span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{padding:"5px 6px",color:TXT1,fontWeight:700}}>TOTAL</td>
                    <td style={{padding:"5px 6px",textAlign:"right",color:TXT1,fontWeight:700}}>€2,400</td>
                    <td style={{padding:"5px 6px",textAlign:"right",color:TXT1,fontWeight:700}}>€1,600</td>
                    <td style={{padding:"5px 6px",textAlign:"right",color:TXT1,fontWeight:700}}>€800</td>
                    <td style={{padding:"5px 6px",textAlign:"right"}}>
                      <span style={{background:BLUE+"22",color:BLUE,padding:"2px 7px",borderRadius:3,fontWeight:700}}>66.7%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>

            {/* Alerts & Notifications */}
            <Card title="Alerts & Notifications">
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {alerts.map((a,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 0",borderBottom:`1px solid ${BORDER}`}}>
                    <span style={{color:TXT3,fontSize:"9px",minWidth:34}}>{a.time}</span>
                    <span style={{background:a.color+"22",color:a.color,fontSize:"8px",padding:"1px 5px",borderRadius:3,minWidth:44,textAlign:"center",flexShrink:0}}>{a.type}</span>
                    <span style={{color:TXT2,fontSize:"9px",flex:1}}>{a.desc}</span>
                    <div style={{background:a.color+"22",border:`1px solid ${a.color}`,borderRadius:3,padding:"1px 5px",fontSize:"8px",color:a.color,flexShrink:0,textTransform:"uppercase"}}>{a.type.slice(0,4)}</div>
                  </div>
                ))}
              </div>
              <button style={{width:"100%",background:"transparent",border:`1px solid ${BORDER}`,borderRadius:4,color:TXT2,fontSize:10,padding:5,cursor:"pointer",marginTop:8}}>
                VIEW ALL ALERTS
              </button>
            </Card>

            {/* Expenses by Category Pie */}
            <Card title="Expenses by Category">
              <div style={{height:110}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={budgetSlices} cx="50%" cy="50%" innerRadius={28} outerRadius={50} dataKey="pct" stroke="none">
                      {budgetSlices.map((d,i)=><Cell key={i} fill={d.color}/>)}
                    </Pie>
                    <Tooltip {...ttip} formatter={(v,n)=>[`${v}%`,n]}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {budgetSlices.map((d,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"2px 0",fontSize:"9px"}}>
                  <div style={{width:7,height:7,background:d.color,borderRadius:1,flexShrink:0}}/>
                  <span style={{color:TXT2,flex:1}}>{d.name}</span>
                  <span style={{color:TXT3}}>{d.pct}%</span>
                </div>
              ))}
              <button style={{width:"100%",background:"transparent",border:`1px solid ${BORDER}`,borderRadius:4,color:TXT2,fontSize:10,padding:5,cursor:"pointer",marginTop:6}}>
                VIEW ANALYTICS
              </button>
            </Card>

            {/* Top Destinations */}
            <Card title="Top Destinations">
              <div style={{fontSize:"9px",color:TXT3,display:"grid",gridTemplateColumns:"1fr auto auto",gap:"2px 8px",marginBottom:4,fontWeight:700,letterSpacing:"0.5px"}}>
                <span>DESTINATION</span><span style={{textAlign:"right"}}>VISITORS</span><span>STATUS</span>
              </div>
              {destinations.map((d,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:"2px 8px",padding:"4px 0",borderBottom:`1px solid ${BORDER}`,alignItems:"center"}}>
                  <span style={{color:TXT1,fontSize:10}}>{d.dest}</span>
                  <span style={{color:TXT1,fontSize:10,textAlign:"right"}}>{d.vis}</span>
                  <div style={{width:8,height:8,borderRadius:"50%",background:BLUE,boxShadow:`0 0 4px ${BLUE}`}}/>
                </div>
              ))}
            </Card>

            {/* System Status */}
            <Card title="System Status">
              {["GPS Tracking","Payments","Notifications","Data Sync","Server Status"].map((s,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${BORDER}`}}>
                  <span style={{color:TXT2,fontSize:10}}>{s}</span>
                  <div style={{width:8,height:8,borderRadius:"50%",background:GREEN,boxShadow:`0 0 5px ${GREEN}55`}}/>
                </div>
              ))}
              <div style={{color:GREEN,fontSize:"9px",marginTop:8,textAlign:"center",fontWeight:600}}>✓ All systems operational</div>
            </Card>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{background:SIDEBAR,borderTop:`1px solid ${BORDER}`,padding:"5px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"9px",color:TXT3,flexShrink:0}}>
          <span>© 2024 Quetzalcoatl Tracker. All rights reserved.</span>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {["Privacy Policy","Terms of Service","Contact Support"].map((lbl,i)=>(
              <span key={i} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                {i>0 && <span style={{color:BORDER}}>|</span>}
                {lbl}
              </span>
            ))}
            <span style={{color:TXT2,marginLeft:4}}>v2.4.1</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
