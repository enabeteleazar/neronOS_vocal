'use client'

import { useEffect, useState } from 'react'

const nav = [
  'Dashboard',
  'Agents',
  'Mémoire',
  'Objectifs',
  'Planner',
  'Critic Engine',
  'Watchdog',
  'Home Assistant',
  'Logs',
  'Sécurité',
  'Paramètres',
]

const services = [
  ['Core API', 'Actif'],
  ['LLM Service', 'Actif'],
  ['Memory', 'Actif'],
  ['Watchdog', 'Actif'],
  ['Voice STT', 'Actif'],
]

const events = [
  ['14:37', 'Info', 'SelfModel synchronisé', 'OK'],
  ['14:35', 'Planner', 'Nouvelle tâche générée', 'OK'],
  ['14:31', 'Memory', 'Contexte indexé', 'OK'],
  ['14:26', 'Watchdog', 'Scan système terminé', 'OK'],
]

const goals = [
  ['Autonomie cognitive', '82%', 'Haute'],
  ['Mémoire long terme', '67%', 'Haute'],
  ['Stabilité Core', '94%', 'Critique'],
  ['Sécurité locale', '75%', 'Moyenne'],
]

function Panel({
  title,
  children,
  className = '',
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className="panel">
      <div className="panel-title">{title}</div>
      {children}
    </section>
  )
}

function Kpi({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="kpi">
      <div className="kpi-icon">{icon}</div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}

function Donut({ value, label }: { value: string; label: string }) {
  return (
    <div className="donut-wrap">
      <div className="donut">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}

export default function Home() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('fr-FR'))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="brand">
          <div className="flag">N</div>
          <div>
            <h1>NÉRON OS</h1>
            <p>PERSONAL AI OPERATIONS</p>
          </div>
        </div>

        <div className="top-title">OPERATIONS CONTROL · MONITORING · INSIGHTS · REAL-TIME TRACKING</div>

        <div className="kpi-strip">
          <Kpi icon="⚙" value="12" label="ACTIVE AGENTS" />
          <Kpi icon="🧠" value="1,821" label="MEMORY ITEMS" />
          <Kpi icon="●" value="98.7%" label="SYSTEM HEALTH" />
          <Kpi icon="⚠" value="2" label="ALERTS" />
          <Kpi icon="◷" value={time} label="LOCAL TIME" />
        </div>

        <div className="admin">
          <div className="admin-avatar">N</div>
          <div>
            <strong>NÉRON ADMIN</strong>
            <span>Système Principal</span>
          </div>
        </div>
      </header>

      <aside className="sidebar">
        <Panel title="NAVIGATION" className="nav-panel">
          <div className="nav-list">
            {nav.map((item, i) => (
              <div className="item" key={item}>
                <span>{['▣', '◈', '◎', '▤', '⌁', '◇', '◉', '⌂', '☰', '⬡', '⚙'][i]}</span>
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="QUICK ACCESS" className="qr-panel">
          <div className="fake-qr">
            {Array.from({ length: 49 }).map((_, i) => <i key={i} />)}
          </div>
          <p>Scan profile access</p>
        </Panel>
      </aside>

      <section className="grid">
        <Panel title="NERON OVERVIEW" className="overview">
          <div className="profile">
            <div className="portrait">N</div>
            <div className="profile-info">
              <h2>Néron Core</h2>
              <p>Assistant IA personnel</p>
              <dl>
                <dt>Version</dt><dd>3.2.x</dd>
                <dt>Mode</dt><dd>Autonome</dd>
                <dt>Status</dt><dd className="green">Active</dd>
              </dl>
            </div>
          </div>
          <div className="actions">
            <button>Message</button>
            <button>Voice</button>
            <button>Profile</button>
          </div>
        </Panel>

        <Panel title="REAL-TIME COGNITIVE TRACKING" className="tracking">
          <div className="map">
            <span className="route r-a" />
            <span className="route r-b" />
            <span className="route r-c" />
            <i className="point p1" />
            <i className="point p2" />
            <i className="point p3" />
          </div>
          <div className="track-info">
            <p><span>From</span><strong>User Input</strong></p>
            <p><span>To</span><strong>Agent Router</strong></p>
            <p><span>Latency</span><strong>142 ms</strong></p>
            <p><span>State</span><strong>Running</strong></p>
            <button>DETAILS & ROUTE</button>
          </div>
        </Panel>

        <Panel title="TODAY'S TASKS" className="itinerary">
          {[
            ['09:00', 'Healthcheck', 'Completed'],
            ['10:30', 'Memory sync', 'Completed'],
            ['13:00', 'Planner cycle', 'In Progress'],
            ['15:30', 'Security audit', 'Upcoming'],
            ['18:00', 'Backup memory', 'Upcoming'],
          ].map(([t, n, s], i) => (
            <div className="timeline-row" key={n}>
              <i className="dot" />
              <strong>{t}</strong>
              <span>{n}</span>
              <em>{s}</em>
            </div>
          ))}
          <button className="full-btn">FULL TASK LIST</button>
        </Panel>

        <Panel title="SYSTEM HEALTH" className="health">
          <Donut value="98.7%" label="global health" />
          <div className="legend">
            <p><i /> Used <strong>41%</strong></p>
            <p><i /> Stable <strong>98%</strong></p>
            <p><i /> Warning <strong>2</strong></p>
          </div>
        </Panel>

        <Panel title="RESOURCE BREAKDOWN">
          <div className="donut-row">
            <div className="small-donut"><b>64%</b><span>CPU</span></div>
            <div className="donut-data">
              <p><i /> Core 30%</p>
              <p><i /> LLM 25%</p>
              <p><i /> Memory 20%</p>
              <p><i /> Other 25%</p>
            </div>
          </div>
        </Panel>

        <Panel title="ACTIVITY OVER TIME">
          <div className="bars">
            {Array.from({ length: 14 }).map((_, i) => (
              <i key={i} style={{ height: `${8 + i * 2}px` }} />
            ))}
          </div>
        </Panel>

        <Panel title="GOALS VS ACTUAL">
          <div className="line-chart">
            {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
          </div>
        </Panel>

        <Panel title="VOICE INTERFACE" className="voice">
          <div className="orb">
            <span />
            <b>N</b>
          </div>
          <div>
            <h3>Interaction vocale</h3>
            <p>STT/TTS prêt</p>
            <button>START VOICE</button>
          </div>
        </Panel>

        <Panel title="TRIP HEALTH SCORE" className="score">
          <Donut value="96" label="out of 100" />
          <div className="score-legend">
            <p>Excellent <span>80-100</span></p>
            <p>Good <span>60-79</span></p>
            <p>Fair <span>40-59</span></p>
          </div>
        </Panel>

        <Panel title="GOALS BY CATEGORY" className="table-panel">
          <table>
            <thead>
              <tr><th>Objectif</th><th>Progress</th><th>Priority</th><th>Status</th></tr>
            </thead>
            <tbody>
              {goals.map(([a, b, c]) => (
                <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td><td className="green">OK</td></tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="ALERTS & NOTIFICATIONS" className="table-panel">
          <table>
            <thead>
              <tr><th>Time</th><th>Type</th><th>Description</th><th>Status</th></tr>
            </thead>
            <tbody>
              {events.map(([a, b, c, d]) => (
                <tr key={c}><td>{a}</td><td>{b}</td><td>{c}</td><td className="green">{d}</td></tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="AGENTS BY CATEGORY">
          <div className="pie-section">
            <div className="pie" />
            <div className="donut-data">
              <p><i /> Core 30%</p>
              <p><i /> Memory 25%</p>
              <p><i /> Planner 20%</p>
              <p><i /> Tools 15%</p>
              <p><i /> Other 10%</p>
            </div>
          </div>
        </Panel>

        <Panel title="TOP MODULES">
          <div className="module-list">
            {['Core', 'LLM', 'Memory', 'Home Assistant', 'Watchdog'].map((m, i) => (
              <p key={m}><span>{m}</span><strong>{542 - i * 71}</strong><i /></p>
            ))}
          </div>
        </Panel>

        <Panel title="SYSTEM STATUS">
          <div className="service-list">
            {services.map(([a, b]) => (
              <p key={a}><span>{a}</span><strong>{b}</strong><i /></p>
            ))}
          </div>
          <em className="all-ok">All systems operational</em>
        </Panel>
      </section>

      <footer className="footer">
        <span>© 2026 NéronOS Tracker. All rights reserved.</span>
        <span>Privacy Policy | Terms of Service | Contact Support</span>
        <span>v3.2.1</span>
      </footer>
    </main>
  )
}
