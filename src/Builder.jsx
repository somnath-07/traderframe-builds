import { cloneElement, useEffect, useRef, useState } from 'react';
import { ArrowLeft } from '@phosphor-icons/react/ArrowLeft';
import { ArrowRight } from '@phosphor-icons/react/ArrowRight';
import { ArrowsClockwise } from '@phosphor-icons/react/ArrowsClockwise';
import { Broadcast } from '@phosphor-icons/react/Broadcast';
import { Bug } from '@phosphor-icons/react/Bug';
import { ChartBar } from '@phosphor-icons/react/ChartBar';
import { Check } from '@phosphor-icons/react/Check';
import { CheckCircle } from '@phosphor-icons/react/CheckCircle';
import { Circle } from '@phosphor-icons/react/Circle';
import { Copy } from '@phosphor-icons/react/Copy';
import { FileText as FileClock } from '@phosphor-icons/react/FileText';
import { Flag } from '@phosphor-icons/react/Flag';
import { Funnel } from '@phosphor-icons/react/Funnel';
import { Info } from '@phosphor-icons/react/Info';
import { Lightning } from '@phosphor-icons/react/Lightning';
import { LockKey } from '@phosphor-icons/react/LockKey';
import { Pause } from '@phosphor-icons/react/Pause';
import { Play } from '@phosphor-icons/react/Play';
import { Plus } from '@phosphor-icons/react/Plus';
import { Power } from '@phosphor-icons/react/Power';
import { ShieldCheck } from '@phosphor-icons/react/ShieldCheck';
import { CellSignalFull as Signal } from '@phosphor-icons/react/CellSignalFull';
import { SlidersHorizontal } from '@phosphor-icons/react/SlidersHorizontal';
import { SquaresFour } from '@phosphor-icons/react/SquaresFour';
import { Wallet } from '@phosphor-icons/react/Wallet';
import { WarningCircle } from '@phosphor-icons/react/WarningCircle';
import { X } from '@phosphor-icons/react/X';
import { canOpen, changeProvider, demoSetup, initialSetup, isReady, sections, validateSection } from './model.js';

const icons = [Signal, Wallet, SlidersHorizontal, Flag, ShieldCheck, Funnel, CheckCircle];
const titles = ['Choose Signal Source', 'Connect Your Broker', 'Configure Trading', 'Set Your Goals', 'Manage Your Risk', 'Choose Trading Filters', 'Review & Activate'];
const descriptions = ['Tell TraderFrame where incoming trade instructions will originate.', 'Connect a broker and choose the account your bot will trade with.', 'Define the strategy, market, and execution settings for your bot.', 'Decide how your bot should take profit and manage its targets.', 'Put clear limits in place before your bot starts trading.', 'Choose when your bot trades and which signals it should accept.', 'Check every connection and setting before activating your bot.'];

function Button({ children, icon: Icon, variant = 'primary', className = '', ...props }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{Icon && <Icon size={18} />}<span>{children}</span></button>;
}
function Brand({ workspace }) {
  return <div className="brand"><img src="/traderframe-logo.png" alt="TraderFrame" /><div><strong>TraderFrame</strong><span>{workspace ? 'Trading control center' : 'Create bot · Wizard prototype'}</span></div></div>;
}
function Badge({ children, success = false }) { return <span className={`badge ${success ? 'badge-success' : ''}`}>{children}</span>; }
function Field({ label, children, ...props }) { return <label className="field"><span>{label}</span>{children ? cloneElement(children, { 'aria-label': label }) : <input aria-label={label} {...props} />}</label>; }
function Notice({ children, error = false }) { const Icon = error ? WarningCircle : CheckCircle; return <div className={`notice ${error ? 'notice-error' : ''}`} role="status"><Icon size={20} /><span>{children}</span></div>; }

function Providers({ data, setData }) {
  return <div className="providers">{[['TradingView', 'Webhook alerts', 'TV'], ['MT4', 'Expert Advisor connector', '4'], ['MT5', 'Terminal connector', '5'], ['Other', 'Custom integration', null]].map(([name, subtitle, badge]) => <button key={name} className={`provider ${data.provider === name ? 'selected' : ''}`} aria-pressed={data.provider === name} onClick={() => setData(current => changeProvider(current, name))}>
    <span className="provider-symbol">{badge ? <img src={`/provider-${badge}.png`} alt="" /> : <Plus size={20} weight="bold" />}</span><span className="provider-text"><strong>{name}</strong><small>{subtitle}</small></span>{data.provider === name && <Check className="provider-check" size={20} />}
  </button>)}</div>;
}
function SignalForm({ data, setData, onEvent }) {
  const [status, setStatus] = useState('idle'); const [fail, setFail] = useState(false);
  const [copied, setCopied] = useState(false); const [identifier, setIdentifier] = useState('TF-DEMO-1024');
  const [url, setUrl] = useState('https://hooks.traderframe.app/tf_demo_8K2L'); const [error, setError] = useState('');
  const timer = useRef(); useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { clearTimeout(timer.current); setStatus('idle'); setError(''); }, [data.provider]);
  const webhook = ['TradingView', 'Other'].includes(data.provider);
  const connect = () => {
    if (webhook ? !/^https:\/\/\S+$/.test(url) : !identifier.trim()) { setError(webhook ? 'Enter a valid HTTPS webhook URL.' : 'Enter your terminal ID.'); return; }
    setError(''); setStatus('checking'); timer.current = setTimeout(() => { setStatus(fail ? 'error' : 'success'); if (!fail) { setData(current => ({ ...current, signalConnected: true })); onEvent('Signal source connected'); } }, 650);
  };
  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); } catch { setError('Clipboard unavailable. Select and copy the webhook URL.'); } };
  return <><Providers data={data} setData={setData} /><section className="connection-card">
    <div className="card-title"><div><h2>Connect {data.provider}</h2><p>Only the fields needed for this provider are shown.</p></div><Badge success={data.signalConnected}>{data.signalConnected ? 'Connected' : 'Not connected'}</Badge></div>
    <div className="instruction-grid">{(webhook ? ['Create or open an alert', 'Select Webhook URL', 'Paste the URL below'] : ['Open your terminal', 'Install the connector', 'Enter your terminal ID']).map((text, i) => <div key={text}><span>{i + 1}</span>{text}</div>)}</div>
    <div className="webhook-label">{webhook ? 'Webhook URL' : 'Terminal ID'} <Info size={16} /></div>
    <div className="webhook-row"><input aria-label={webhook ? 'Webhook URL' : 'Terminal ID'} value={webhook ? url : identifier} onChange={e => webhook ? setUrl(e.target.value) : setIdentifier(e.target.value)} />{webhook && <Button variant="secondary" icon={Copy} onClick={copy}>{copied ? 'Copied!' : 'Copy URL'}</Button>}</div>
    {error && <Notice error>{error}</Notice>}{status === 'error' && <Notice error>Connection failed. Check your source and try again.</Notice>}{data.signalConnected && <Notice>{data.provider} connected. Your signal source is ready.</Notice>}
    <div className="connection-footer"><button className={`simulate ${fail ? 'enabled' : ''}`} role="switch" aria-checked={fail} onClick={() => setFail(!fail)}>{fail && <Check size={14} />}Simulate failure</button><Button icon={data.signalConnected ? Check : Broadcast} disabled={status === 'checking' || data.signalConnected} onClick={connect}>{status === 'checking' ? 'Connecting…' : data.signalConnected ? 'Source connected' : status === 'error' ? 'Retry connection' : 'Connect source'}</Button></div>
  </section></>;
}
function BrokerForm({ data, setData, onEvent }) {
  const [status, setStatus] = useState('idle'); const [fail, setFail] = useState(false);
  const [key, setKey] = useState('TF-DEMO-KEY'); const [secret, setSecret] = useState('demo-secret'); const [error, setError] = useState('');
  const timer = useRef(); useEffect(() => () => clearTimeout(timer.current), []);
  const connect = () => { if (!key.trim() || !secret.trim()) return setError('Enter both your API key and secret.'); setError(''); setStatus('checking'); timer.current = setTimeout(() => { setStatus(fail ? 'error' : 'success'); if (!fail) { setData(current => ({ ...current, brokerConnected: true, active: false })); onEvent('Broker authenticated'); } }, 650); };
  return <section className="connection-card broker-form"><div className="card-title"><div><h2>Broker connection</h2><p>Use the demo credentials to test the connection locally.</p></div><Badge success={data.brokerConnected}>{data.brokerConnected ? 'Authenticated' : 'Not connected'}</Badge></div>
    <div className="form-grid"><Field label="Broker"><select value={data.broker} onChange={e => { clearTimeout(timer.current); setData(current => ({ ...current, broker: e.target.value, brokerConnected: false, account: '', active: false, reviewed: initialSetup().reviewed })); setStatus('idle'); }}><option>Pepperstone</option><option>IC Markets</option><option>OANDA</option></select></Field><Field label="Environment"><select defaultValue="Demo"><option>Demo</option></select></Field><Field label="API key" value={key} onChange={e => setKey(e.target.value)} /><Field label="API secret" type="password" value={secret} onChange={e => setSecret(e.target.value)} /></div>
    {(error || status === 'error') && <Notice error>{error || 'Authentication failed. Check the credentials and try again.'}</Notice>}
    {data.brokerConnected && <><Notice>{data.broker} authenticated. Select an execution account.</Notice><Field label="Execution account"><select value={data.account} onChange={e => setData(current => ({ ...current, account: e.target.value, active: false, reviewed: initialSetup().reviewed }))}><option value="">Select an account</option><option>Demo account · 10,000 USD</option><option>Demo account · 5,000 USD</option></select></Field></>}
    <div className="connection-footer"><button className={`simulate ${fail ? 'enabled' : ''}`} role="switch" aria-checked={fail} onClick={() => setFail(!fail)}>{fail && <Check size={14} />}Simulate failure</button><Button icon={Wallet} disabled={status === 'checking' || data.brokerConnected} onClick={connect}>{status === 'checking' ? 'Connecting…' : data.brokerConnected ? 'Broker connected' : status === 'error' ? 'Retry connection' : 'Connect broker'}</Button></div>
  </section>;
}
function SettingsForm({ index, data, setData, onSave }) {
  const [error, setError] = useState('');
  const update = (name, value) => { setError(''); setData(current => ({ ...current, [name]: value, active: false, reviewed: { ...current.reviewed, [sections[index].toLowerCase()]: false } })); };
  const input = (name, label, type = 'text') => <Field label={label} type={type} value={data[name]} onChange={e => update(name, e.target.value)} />;
  const select = (name, label, values) => <Field label={label}><select value={data[name]} onChange={e => update(name, e.target.value)}>{values.map(x => <option key={x}>{x}</option>)}</select></Field>;
  const save = () => { const message = validateSection(data, index); if (message) return setError(message); setData(current => ({ ...current, reviewed: { ...current.reviewed, [sections[index].toLowerCase()]: true } })); onSave(); };
  return <section className="connection-card settings-form"><div className="card-title"><div><h2>{sections[index]} settings</h2><p>Review these settings and save to complete this section.</p></div><Badge success={isReady(data, index)}>{isReady(data, index) ? 'Configured' : 'Not configured'}</Badge></div><div className="form-grid">
    {index === 2 && <>{input('name', 'Strategy name')}{select('symbol', 'Trading pair', ['EUR/USD', 'GBP/USD', 'BTC/USD', 'XAU/USD'])}{select('direction', 'Trade direction', ['Buy & sell', 'Buy only', 'Sell only'])}{select('orderType', 'Order type', ['Market', 'Limit'])}{input('amount', 'Trade amount (USD)', 'number')}{input('leverage', 'Leverage', 'number')}</>}
    {index === 3 && <>{input('takeProfit', 'Take profit (USD)', 'number')}{select('targetMode', 'Target mode', ['Fixed target', 'Trailing target'])}</>}
    {index === 4 && <>{input('stopLoss', 'Stop loss (USD)', 'number')}{input('dailyLoss', 'Daily loss limit (USD)', 'number')}{input('maxPositions', 'Maximum open positions', 'number')}</>}
    {index === 5 && <>{select('session', 'Trading session', ['All sessions', 'London', 'New York', 'London & New York'])}{input('spread', 'Maximum spread (pips)', 'number')}<label className="check-field"><input type="checkbox" checked={data.newsFilter} onChange={e => update('newsFilter', e.target.checked)} /><span><strong>High-impact news filter</strong><small>Pause new orders around major news events.</small></span></label></>}
  </div>{error && <Notice error>{error}</Notice>}<div className="connection-footer"><span className="muted">Changes apply to this browser only.</span><Button icon={Check} onClick={save}>Save {sections[index].toLowerCase()}</Button></div></section>;
}
function Review({ data, onEdit, activate, activating, activationError }) {
  const [confirmed, setConfirmed] = useState(false); const [fail, setFail] = useState(false);
  return <section className="connection-card review-card"><div className="card-title"><div><h2>{data.name}</h2><p>Every section is ready. Review your setup before activation.</p></div><Badge success>Ready to activate</Badge></div>
    <div className="review-rows">{[[data.provider, 'Connected'], [`${data.broker} · ${data.account}`, 'Connected'], [`${data.symbol} · $${data.amount} · ${data.leverage}× leverage`, data.direction], [`$${data.takeProfit} take profit`, data.targetMode], [`$${data.stopLoss} stop loss · $${data.dailyLoss} daily limit`, `${data.maxPositions} open positions`], [data.session, data.newsFilter ? 'News filter on' : 'News filter off']].map(([value, note], i) => <div key={sections[i]}><CheckCircle size={20} /><span><small>{sections[i]}</small><strong>{value}</strong><small>{note}</small></span><button onClick={() => onEdit(i)}>Edit</button></div>)}</div>
    <label className="check-field acknowledgement"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} /><span><strong>I have reviewed the account, trading settings, and risk limits.</strong><small>This is a local simulation. No real orders will be placed.</small></span></label>{activationError && <Notice error>Activation failed. Your setup is preserved. Try again.</Notice>}
    <div className="connection-footer"><button className={`simulate ${fail ? 'enabled' : ''}`} role="switch" aria-checked={fail} onClick={() => setFail(!fail)}>Simulate activation failure</button><Button icon={Power} disabled={!confirmed || activating || !isReady(data, 6)} onClick={() => activate(fail)}>{activating ? 'Activating…' : activationError ? 'Retry activation' : 'Activate bot'}</Button></div>
  </section>;
}
function Monitor({ data, onEdit }) {
  const [paused, setPaused] = useState(false); const [offline, setOffline] = useState(false); const [empty, setEmpty] = useState(false);
  if (!data.active) return <section className="empty-panel"><ChartBar size={40} /><h2>Your bot monitor is ready when you are</h2><p>Complete your setup and activate a bot to see its performance here.</p><Button onClick={onEdit}>Return to bot builder</Button></section>;
  return <><div className="monitor-heading"><div><Badge success={!offline && !paused}>{offline ? 'Connection lost' : paused ? 'Paused' : 'Active · Demo'}</Badge><h1>{data.name}</h1><p>{data.provider} → {data.broker} · {data.symbol}</p></div><Button icon={paused ? Play : Pause} onClick={() => setPaused(!paused)}>{paused ? 'Resume bot' : 'Pause bot'}</Button></div>
    {offline && <Notice error>Broker connection interrupted. New orders are paused. <button className="text-action" onClick={() => setOffline(false)}>Reconnect</button></Notice>}
    <div className="metrics">{[['Realized P&L', empty ? '$0.00' : '+$216.30'], ['Win rate', empty ? '—' : '64%'], ['Open positions', empty ? '0' : '1'], ['Connection', offline ? 'Offline' : 'Healthy']].map(([label, value]) => <section key={label}><small>{label}</small><strong>{value}</strong><span>Demo performance</span></section>)}</div>
    <section className="connection-card"><div className="card-title"><div><h2>Execution activity</h2><p>Follow signals from source to execution.</p></div><Badge>Simulation</Badge></div>{empty ? <div className="empty-activity"><ChartBar size={30} /><h3>No execution activity yet</h3><p>Your bot is waiting for the next signal.</p></div> : <div className="activity-list">{['Signal received from TradingView', 'Risk checks passed', `${data.symbol} demo order filled`].map(text => <div key={text}><CheckCircle size={20} /><span>{text}</span><small>Just now</small></div>)}</div>}<div className="monitor-tools"><label><input type="checkbox" checked={offline} onChange={e => setOffline(e.target.checked)} /> Simulate connection loss</label><label><input type="checkbox" checked={empty} onChange={e => setEmpty(e.target.checked)} /> Empty activity</label></div></section></>;
}
function Summary({ data, step, goTo }) {
  return <aside className="summary"><h2>SETUP SUMMARY</h2><div className="summary-items">{sections.map((name, i) => <button key={name} className={`${step === i ? 'current' : ''} ${isReady(data, i) ? 'complete' : ''}`} disabled={!canOpen(data, i)} onClick={() => goTo(i)}><span className="step-number">{isReady(data, i) ? <Check size={16} /> : i + 1}</span><span><strong>{name}</strong><small>{i < 2 ? isReady(data, i) ? 'Connected' : 'Not connected' : i === 6 ? data.active ? 'Active' : 'Not started' : isReady(data, i) ? 'Configured' : 'Not configured'}</small></span></button>)}</div><div className="dependency-note"><LockKey size={17} /><p>Broker requires signal connection.<br />Trading requires an account. Activation requires every section.</p></div></aside>;
}
function WorkspaceCard({ number, title, icon: Icon, badge, success, locked, children, action, actionLabel, dependency }) {
  return <section className={`module-card ${locked ? 'module-locked' : ''}`}><div className="module-top"><span className="section-icon"><Icon size={22} /></span><div><small>MODULE {String(number).padStart(2, '0')}</small><h2>{title}</h2></div><Badge success={success}>{badge}</Badge></div><div className="module-content">{children}</div><Button className="module-action" disabled={locked} onClick={action}>{actionLabel}<ArrowRight size={16} /></Button>{locked && <div className="module-dependency"><LockKey size={16} /><span>{dependency}</span></div>}</section>;
}
function Drawer({ title, subtitle, close, children }) {
  const ref = useRef(); const closeRef = useRef(close); closeRef.current = close;
  useEffect(() => { const previous = document.activeElement; ref.current?.focus(); const key = e => { if (e.key === 'Escape') closeRef.current(); if (e.key === 'Tab') { const list = [...ref.current.querySelectorAll('button:not(:disabled), input, select, [tabindex="0"]')]; if (e.shiftKey && document.activeElement === list[0]) { e.preventDefault(); list.at(-1)?.focus(); } else if (!e.shiftKey && document.activeElement === list.at(-1)) { e.preventDefault(); list[0]?.focus(); } } }; document.addEventListener('keydown', key); const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', key); document.body.style.overflow = overflow; previous?.focus(); }; }, []);
  return <div className="drawer-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}><section ref={ref} className="drawer" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}><header><div><h2>{title}</h2><p>{subtitle}</p></div><button className="icon-btn" aria-label="Close panel" onClick={close}><X size={22} /></button></header><div className="drawer-content">{children}</div></section></div>;
}
export function Builder({ mode }) {
  const workspace = mode === 'workspace'; const [data, setData] = useState(initialSetup); const [step, setStep] = useState(0);
  const [panel, setPanel] = useState(null); const [view, setView] = useState('builder'); const [settingsTab, setSettingsTab] = useState(2);
  const [debug, setDebug] = useState(false); const [events, setEvents] = useState([]); const [left, setLeft] = useState(false);
  const [activating, setActivating] = useState(false); const [activationError, setActivationError] = useState(false);
  const timer = useRef(); useEffect(() => () => clearTimeout(timer.current), []);
  const onEvent = message => setEvents(current => [{ message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...current]);
  const reset = () => { clearTimeout(timer.current); setData(initialSetup()); setStep(0); setPanel(null); setView('builder'); setEvents([]); setLeft(false); setActivationError(false); setActivating(false); setDebug(false); };
  const demo = () => { clearTimeout(timer.current); setData(demoSetup()); setStep(6); setView('builder'); setPanel(null); setLeft(false); setActivationError(false); setActivating(false); onEvent('Demo setup loaded'); };
  const activate = fail => { if (!isReady(data, 6)) return; setActivating(true); setActivationError(false); timer.current = setTimeout(() => { setActivating(false); if (fail) return setActivationError(true); setData(current => ({ ...current, active: true })); setPanel(null); setView('monitor'); onEvent('Bot activated in prototype mode'); }, 700); };
  const goTo = i => { if (!canOpen(data, i)) return; if (workspace) { if (i < 2) setPanel(i); else if (i < 6) { setSettingsTab(i); setPanel('settings'); } else setPanel('review'); } else setStep(i); };
  const settingsSave = index => { onEvent(`${sections[index]} settings reviewed`); if (workspace) { if (index < 5) setSettingsTab(index + 1); else setPanel(null); } else setStep(index + 1); };
  const review = <Review data={data} onEdit={goTo} activate={activate} activating={activating} activationError={activationError} />;
  const form = index => index === 0 ? <SignalForm data={data} setData={setData} onEvent={onEvent} /> : index === 1 ? <BrokerForm data={data} setData={setData} onEvent={onEvent} /> : index < 6 ? <SettingsForm key={index} index={index} data={data} setData={setData} onSave={() => settingsSave(index)} /> : review;
  const count = Object.values(data.reviewed).filter(Boolean).length;
  const remaining = !isReady(data, 0) || !isReady(data, 1) ? 1 : 4 - count;
  const StepIcon = icons[step];
  return <div className={workspace ? 'app workspace-app' : 'app wizard-app'}>
    <header className="app-header"><Brand workspace={workspace} />{workspace && <div className="workspace-header-title"><strong>Create Bot Workspace</strong><small>Desktop MVP · local interactions only</small></div>}<div className="header-actions">{!workspace && <span className="local-pill">LOCAL STATE ONLY</span>}<Button variant="secondary" icon={Lightning} onClick={demo}>Load demo setup</Button><Button variant="secondary" icon={ArrowsClockwise} onClick={reset}>Reset</Button><Button variant="ghost" className="leave-btn" onClick={() => setLeft(true)}>Leave {workspace ? 'workspace' : 'setup'} <X size={17} /></Button></div></header>
    {workspace && <aside className="sidebar"><div className="sidebar-label">WORKSPACE</div><nav aria-label="Workspace"><button className={view === 'builder' ? 'selected' : ''} onClick={() => setView('builder')}><SquaresFour size={21} />Bot builder</button><button className={view === 'monitor' ? 'selected' : ''} onClick={() => setView('monitor')}><ChartBar size={21} />Bot monitor</button><button className={view === 'activity' ? 'selected' : ''} onClick={() => setView('activity')}><FileClock size={21} />Activity log</button></nav><div className="sidebar-label environment-label">ENVIRONMENT</div><div className="environment"><div><Circle size={18} weight="duotone" /><strong>Prototype mode</strong></div><p>Local state only. No orders leave this browser.</p></div></aside>}
    {!workspace && view === 'builder' && !left && <nav className="progress-nav" aria-label="Setup progress">{sections.map((name, i) => <button className={`${step === i ? 'current' : ''} ${isReady(data, i) ? 'complete' : ''}`} key={name} disabled={!canOpen(data, i)} onClick={() => setStep(i)} aria-current={step === i ? 'step' : undefined}><span className="step-number">{isReady(data, i) ? <Check size={16} /> : i + 1}</span><span>{name}</span></button>)}</nav>}
    {left ? <main className="left-screen"><Brand workspace={workspace} /><h1>Your setup is paused</h1><p>Your changes are still available in this browser session.</p><Button icon={ArrowLeft} onClick={() => setLeft(false)}>Return to {workspace ? 'workspace' : 'setup'}</Button></main> : view === 'monitor' ? <main className="monitor-page"><Monitor key={String(data.active)} data={data} onEdit={() => setView('builder')} />{!workspace && <Button variant="secondary" icon={ArrowLeft} onClick={() => setView('builder')}>Back to setup</Button>}</main> : view === 'activity' ? <main className="activity-page"><div className="workspace-heading"><div><div className="eyebrow">WORKSPACE ACTIVITY</div><h1>Activity log</h1><p>Connections, configuration changes, and bot events from this session.</p></div></div><section className="connection-card">{events.length ? <div className="activity-list">{events.map((event, i) => <div key={i}><CheckCircle size={20} /><span>{event.message}</span><small>{event.time}</small></div>)}</div> : <div className="empty-activity"><FileClock size={32} /><h2>No activity yet</h2><p>Start configuring your bot to see events here.</p></div>}</section></main> : workspace ? <main className="workspace-main"><div className="workspace-heading"><div><div className="eyebrow">BOT BUILDER</div><h1>Create a trading bot</h1><p>Configure the entire relationship in one workspace. Each module unlocks the next.</p></div><span className={`requirements ${isReady(data, 6) ? 'ready' : ''}`}>{data.active ? 'Bot is active' : isReady(data, 6) ? 'Ready to activate' : `${remaining} requirement${remaining === 1 ? '' : 's'} remaining`}</span></div>
      <div className="workspace-layout"><ol className="setup-rail" aria-label="Workspace setup sequence">{[
        ['Signal Source', data.signalConnected, 'Not connected'],
        ['Broker', isReady(data, 1), 'Not connected'],
        ['Bot Settings', count === 4, 'Not configured'],
        ['Review & Activate', data.active, isReady(data, 6) ? 'Ready to activate' : 'Not ready']
      ].map(([label, complete, status], i, items) => <li key={label} className={`${complete ? 'complete' : ''} ${!complete && items.slice(0, i).every(item => item[1]) ? 'current' : ''}`}><span className="rail-number">{complete ? <Check size={16} /> : i + 1}</span><span><strong>{label}</strong><small>{complete ? i === 3 ? 'Active' : i === 2 ? 'Configured' : 'Connected' : status}</small></span></li>)}</ol><div className="modules"><WorkspaceCard number={1} title="Signal Source" icon={Signal} badge={data.signalConnected ? 'Connected' : 'Not connected'} success={data.signalConnected} action={() => setPanel(0)} actionLabel="Configure"><small>Selected provider</small><strong className="provider-identity">{data.provider === 'TradingView' && <img src="/tradingview.svg" alt="" />}{data.provider}</strong><p>Select a provider and test its connector.</p></WorkspaceCard>
      <WorkspaceCard number={2} title="Broker" icon={Wallet} badge={isReady(data, 1) ? 'Connected' : 'Not connected'} success={isReady(data, 1)} locked={!canOpen(data, 1)} dependency="Connect a signal provider first to enable broker setup." action={() => setPanel(1)} actionLabel={data.brokerConnected ? 'Manage connection' : 'Connect'}><small>Selected broker</small><strong>{data.broker}</strong><p>{data.account || 'Authentication and account required.'}</p></WorkspaceCard>
      <WorkspaceCard number={3} title="Bot Settings" icon={SlidersHorizontal} badge={`${count}/4 reviewed`} success={count === 4} locked={!isReady(data, 1)} dependency="Connect a broker and select an account to configure bot settings." action={() => { setSettingsTab(2); setPanel('settings'); }} actionLabel="Open settings"><small>Strategy profile</small><strong>{data.name}</strong><p>{data.symbol} · ${data.amount} · {data.leverage}× leverage</p></WorkspaceCard>
      <WorkspaceCard number={4} title="Review & Activate" icon={Power} badge={data.active ? 'Active' : isReady(data, 6) ? 'Ready' : 'Not ready'} success={isReady(data, 6)} locked={!isReady(data, 6)} dependency="Review all four settings sections to unlock activation." action={() => data.active ? setView('monitor') : setPanel('review')} actionLabel={data.active ? 'Open bot monitor' : 'Review setup'}><small>Activation readiness</small><strong>{isReady(data, 6) ? 'All requirements complete' : 'Complete your setup'}</strong><p>Review every connection and trading rule before your bot goes live.</p></WorkspaceCard></div></div>
    </main> : <main className="wizard-main"><div className="wizard-content"><div className="step-heading"><span className="section-icon"><StepIcon size={23} /></span><div><div className="eyebrow">STEP {step + 1} OF 7</div><h1>{titles[step]}</h1><p>{descriptions[step]}</p></div></div>{form(step)}<div className="wizard-footer"><Button variant="secondary" icon={ArrowLeft} disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button><span>{step + 1} of 7 steps</span>{step < 6 && <Button disabled={!isReady(data, step)} onClick={() => setStep(step + 1)}>Continue <ArrowRight size={18} /></Button>}</div></div><Summary data={data} step={step} goTo={goTo} /></main>}
    {workspace && panel !== null && <Drawer title={panel === 'settings' ? 'Bot Settings' : panel === 'review' ? 'Review & Activate' : titles[panel]} subtitle={panel === 'settings' ? 'Configure and review all four sections.' : 'Changes stay in this browser. No live orders are placed.'} close={() => setPanel(null)}>{panel === 'settings' ? <><nav className="settings-tabs">{[2, 3, 4, 5].map(i => <button key={i} className={settingsTab === i ? 'selected' : ''} onClick={() => setSettingsTab(i)}>{sections[i]} {data.reviewed[sections[i].toLowerCase()] && <Check size={14} />}</button>)}</nav>{form(settingsTab)}</> : panel === 'review' ? review : <>{form(panel)}{((panel === 0 && data.signalConnected) || (panel === 1 && isReady(data, 1))) && <div className="panel-done"><Button icon={Check} onClick={() => setPanel(null)}>Done</Button></div>}</>}</Drawer>}
    <div className="debug-wrap">{debug && <section className="debug-panel"><h2>Prototype state</h2><p>Local simulation · no backend requests</p><pre>{JSON.stringify({ provider: data.provider, signalConnected: data.signalConnected, broker: data.broker, brokerConnected: data.brokerConnected, accountSelected: Boolean(data.account), reviewed: data.reviewed, active: data.active }, null, 2)}</pre></section>}<button className="debug-button" onClick={() => setDebug(!debug)} aria-expanded={debug}><Bug size={19} />Debug state</button></div>
  </div>;
}
