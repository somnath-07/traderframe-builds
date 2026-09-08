import { useEffect, useState } from "react";
import { ActivityIcon as Activity } from "@phosphor-icons/react/Pulse";
import { ArrowClockwise } from "@phosphor-icons/react/ArrowClockwise";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { Bell } from "@phosphor-icons/react/Bell";
import { Books } from "@phosphor-icons/react/Books";
import { Broadcast } from "@phosphor-icons/react/Broadcast";
import { CalendarDots } from "@phosphor-icons/react/CalendarDots";
import { CaretDown } from "@phosphor-icons/react/CaretDown";
import { CaretLeft } from "@phosphor-icons/react/CaretLeft";
import { ChartLineUp } from "@phosphor-icons/react/ChartLineUp";
import { Check } from "@phosphor-icons/react/Check";
import { CheckCircle } from "@phosphor-icons/react/CheckCircle";
import { Copy } from "@phosphor-icons/react/Copy";
import { CurrencyBtc } from "@phosphor-icons/react/CurrencyBtc";
import { Eye } from "@phosphor-icons/react/Eye";
import { FunnelSimple } from "@phosphor-icons/react/FunnelSimple";
import { House } from "@phosphor-icons/react/House";
import { Lightning } from "@phosphor-icons/react/Lightning";
import { LinkSimple } from "@phosphor-icons/react/LinkSimple";
import { LockKey } from "@phosphor-icons/react/LockKey";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { Moon } from "@phosphor-icons/react/Moon";
import { Pause } from "@phosphor-icons/react/Pause";
import { Plus } from "@phosphor-icons/react/Plus";
import { Question } from "@phosphor-icons/react/Question";
import { Robot } from "@phosphor-icons/react/Robot";
import { RocketLaunch } from "@phosphor-icons/react/RocketLaunch";
import { ShieldCheck } from "@phosphor-icons/react/ShieldCheck";
import { SignOut } from "@phosphor-icons/react/SignOut";
import { SlidersHorizontal } from "@phosphor-icons/react/SlidersHorizontal";
import { SquaresFour } from "@phosphor-icons/react/SquaresFour";
import { Target } from "@phosphor-icons/react/Target";
import { Users } from "@phosphor-icons/react/Users";
import { Wallet } from "@phosphor-icons/react/Wallet";
import { WarningCircle } from "@phosphor-icons/react/WarningCircle";
import { X } from "@phosphor-icons/react/X";

const exchanges = [
  { name: "KuCoin", mark: "K", color: "#10a987" }, { name: "Bitget", mark: "B", color: "#11aacc" },
  { name: "BitMart", mark: "BM", color: "#272727" }, { name: "Kraken", mark: "K", color: "#7047eb" },
  { name: "Bybit", mark: "BY", color: "#1a1511" }, { name: "Binance", mark: "BN", color: "#f4b800" },
];
const settingsSteps = [
  { id: "settingsTrading", label: "Trading", icon: SlidersHorizontal }, { id: "settingsGoals", label: "Goals", icon: Target },
  { id: "settingsRisk", label: "Risk", icon: ShieldCheck }, { id: "settingsFilters", label: "Filters", icon: FunnelSimple },
];
const navItems = [House, Users, Robot, ChartLineUp, SquaresFour, CalendarDots, Books, Question];

function Button({ children, tone = "primary", icon: Icon, className = "", ...props }) {
  return <button className={`button button--${tone} ${className}`} {...props}>{Icon ? <Icon size={18} weight="bold" /> : null}<span>{children}</span></button>;
}
function StatusPill({ children, tone = "neutral" }) { return <span className={`status-pill status-pill--${tone}`}>{children}</span>; }
function Field({ label, hint, suffix, children, ...props }) {
  return <label className="field"><span className="field__label">{label}</span>{children || <span className="field__control"><input {...props} />{suffix ? <b>{suffix}</b> : null}</span>}{hint ? <span className="field__hint">{hint}</span> : null}</label>;
}
function RadioCards({ options, value, onChange, compact = false }) {
  return <div className={`radio-cards ${compact ? "radio-cards--compact" : ""}`}>{options.map((option) => <button key={option} type="button" onClick={() => onChange(option)} className={value === option ? "is-selected" : ""}><span className="radio-dot">{value === option ? <Check size={12} weight="bold" /> : null}</span>{option}</button>)}</div>;
}

function Shell({ children, screen, onActivate, onView }) {
  const active = screen === "active";
  return <div className="app-shell">
    <aside className="rail" aria-label="Primary navigation"><div className="brand-mark"><span /></div><button className="rail__create" aria-label="Create"><Plus size={19} weight="bold" /></button><nav>{navItems.map((Icon, index) => <button key={index} aria-label={`Navigation ${index + 1}`} className={index === 2 ? "is-active" : ""}><Icon size={19} /></button>)}</nav><div className="rail__meta"><span>5</span><small>Bots</small><span>9</span><small>Credits</small></div><button className="rail__logout" aria-label="Sign out"><SignOut size={19} /></button></aside>
    <header className="topbar"><div className="search"><MagnifyingGlass size={17} /><input aria-label="Search" placeholder="Search" /></div><div className="environment"><button>Live</button><button className="is-active">Demo</button></div><span className="topbar__divider" /><button aria-label="Notifications"><Bell size={18} /></button><button aria-label="Calendar"><CalendarDots size={18} /></button><button aria-label="Theme"><Moon size={18} /></button><Button className="upgrade">Upgrade</Button><div className="avatar">AS</div></header>
    <section className="botbar"><div className="balance"><Wallet size={20} color="#ec6e16" /> <strong>{active ? "46,654.97" : "00"} USD</strong></div><div className="stats"><span><small>Trades</small><b>{active ? 9 : 0}</b></span><span><small>Win</small><b>{active ? 8 : 0}</b></span><span><small>Draw</small><b>0</b></span><span><small>Loss</small><b>{active ? 1 : 0}</b></span></div><div className="bot-actions"><Robot size={19} color="#ec6e16" /><strong>QPOTC</strong><Button icon={active ? Pause : RocketLaunch} onClick={active ? undefined : onActivate}>{active ? "Pause" : "Activate"}</Button><Button tone="soft" icon={Eye} onClick={onView}>View Bot</Button></div></section>
    <main className="workspace">{children}</main>
  </div>;
}

function BuilderCanvas({ signalReady, brokerReady, onSignal, onBroker, onSettings, onReview }) {
  return <div className="builder-canvas"><div className="builder-toolbar"><button onClick={onSignal}>{signalReady ? "Add another Signal Provider" : "Add a New Signal Provider"}</button><button disabled={!signalReady || !brokerReady}>Create a New bot</button><button onClick={onSettings} disabled={!signalReady || !brokerReady}>Configure Bot Settings</button><button onClick={onReview} disabled={!signalReady || !brokerReady}>Add a Router</button></div><div className="flow-canvas" aria-label="Bot connection canvas">
    <div className={`flow-node ${signalReady ? "is-complete" : "is-pending"}`} onClick={!signalReady ? onSignal : undefined} role={!signalReady ? "button" : undefined}>{signalReady ? <Broadcast size={26} weight="fill" /> : <Plus size={22} />}<span><strong>{signalReady ? "TradingView" : "Connect to your Signal Provider"}</strong>{signalReady ? <small>Alert webhook connected</small> : null}</span>{signalReady ? <CheckCircle size={21} weight="fill" /> : null}</div>
    <div className="flow-line"><span /><i>+</i><span /></div><div className="bot-core"><Robot size={30} weight="duotone" /></div><div className="flow-line"><span /><i>+</i><span /></div>
    <div className={`flow-node flow-node--broker ${brokerReady ? "is-complete" : "is-pending"}`} onClick={!brokerReady ? onBroker : undefined} role={!brokerReady ? "button" : undefined}>{brokerReady ? <CurrencyBtc size={26} weight="fill" /> : <Plus size={22} />}<span><strong>{brokerReady ? "Binance" : "Connect to your broker"}</strong>{brokerReady ? <small>Demo · Futures</small> : null}</span>{brokerReady ? <CheckCircle size={21} weight="fill" /> : null}</div>
    {signalReady ? <button className="branch-node" onClick={onSignal}><Plus size={18} /> Add another Signal Provider</button> : null}{signalReady && brokerReady ? <div className="ready-card"><CheckCircle size={21} weight="fill" /><span><strong>Connections ready</strong><small>Complete the four settings sections to activate.</small></span><Button tone="soft" onClick={onSettings}>Configure</Button></div> : null}
  </div></div>;
}

function Drawer({ title, eyebrow, children, onClose, footer, wide = false, closeable = true }) {
  return <div className="overlay"><div className="overlay__scrim" onClick={closeable ? onClose : undefined} /><aside className={`drawer ${wide ? "drawer--wide" : ""}`} aria-label={title}><header><div>{eyebrow ? <span>{eyebrow}</span> : null}<h2>{title}</h2></div>{closeable ? <button onClick={onClose} aria-label="Close"><X size={21} /></button> : null}</header><div className="drawer__body">{children}</div>{footer ? <footer>{footer}</footer> : null}</aside></div>;
}
function ProviderDrawer({ onClose, onTradingView }) {
  const providers = [["Copy Trade", LinkSimple], ["MetaTrader 5", Activity], ["MetaTrader 4", ChartLineUp], ["TradingView", Broadcast], ["Schedule Signal", CalendarDots]];
  return <Drawer title="Select Signal Provider" eyebrow="Step 1 of 4" onClose={onClose}><p className="drawer-intro">Choose where this bot receives its trading instructions. For this prototype, continue with TradingView.</p><div className="provider-grid">{providers.map(([name, Icon]) => <button key={name} onClick={name === "TradingView" ? onTradingView : undefined} className={name === "TradingView" ? "recommended" : ""}><Icon size={28} weight="duotone" /><span><strong>{name}</strong><small>{name === "TradingView" ? "Recommended for alert webhooks" : "Signal connection"}</small></span>{name === "TradingView" ? <StatusPill tone="orange">Use this</StatusPill> : null}</button>)}</div></Drawer>;
}
function TradingViewDrawer({ onClose, onConnect }) {
  const [copied, setCopied] = useState(""); const copy = (name) => { setCopied(name); window.setTimeout(() => setCopied(""), 1200); };
  return <Drawer title="Connect TradingView" eyebrow="Signal connection" onClose={onClose} footer={<><Button tone="ghost" onClick={onClose}>Back</Button><Button icon={LinkSimple} onClick={onConnect}>Connect TradingView</Button></>} wide><div className="connection-hero"><div className="tv-logo">TV</div><div><h3>TradingView alerts</h3><p>Route TradingView strategy alerts securely into this bot.</p></div><StatusPill tone="orange">Not connected</StatusPill></div><ol className="instruction-list"><li><b>Open your alert in TradingView.</b><span>Create or edit the alert that should trigger this bot.</span></li><li><b>Paste this webhook URL.</b><span>Enable Webhook URL in Notifications.</span></li></ol><div className="copy-field"><span>Webhook URL</span><code>https://autobotsignal.io/v1/tradingview</code><button onClick={() => copy("url")}><Copy size={17}/>{copied === "url" ? "Copied" : "Copy"}</button></div><ol className="instruction-list" start="3"><li><b>Paste the JSON into Message.</b><span>Use the payload exactly as shown so TraderFrame can validate it.</span></li></ol><div className="code-block"><div><span>BUY / LONG</span><button onClick={() => copy("json")}><Copy size={17}/>{copied === "json" ? "Copied" : "Copy JSON"}</button></div><code>{`{\n  "bot_id": "QPOTC",\n  "action": "buy",\n  "symbol": "{{ticker}}",\n  "price": "{{close}}"\n}`}</code></div><div className="info-callout"><ShieldCheck size={22}/><span><b>Prototype connection</b><small>No real webhook is created. Continue to preview the verification state.</small></span></div></Drawer>;
}
function CheckDrawer({ type, onDone }) {
  const [ready, setReady] = useState(false); useEffect(() => { const id = window.setTimeout(() => setReady(true), 900); return () => window.clearTimeout(id); }, []); const signal = type === "signal";
  return <Drawer title={signal ? "Testing TradingView" : "Checking Binance"} eyebrow="Connection verification" onClose={onDone} closeable={ready} footer={ready ? <Button icon={ArrowRight} onClick={onDone}>Continue</Button> : null}><div className={`check-orbit ${ready ? "is-ready" : ""}`}>{ready ? <CheckCircle size={44} weight="fill"/> : <ArrowClockwise size={42}/>}</div><div className="check-title"><h3>{ready ? "Connection verified" : "Running secure checks…"}</h3><p>{ready ? (signal ? "TraderFrame received the sample alert." : "Binance credentials and trading access are ready.") : "This normally takes a few seconds."}</p></div><div className="check-list">{(signal ? ["Webhook token", "Payload schema", "Sample alert"] : ["API credentials", "Trading permission", "Futures market access", "Account health"]).map((item,index) => <div key={item}><span className={ready || index < 2 ? "done" : "pending"}>{ready || index < 2 ? <Check size={13} weight="bold"/> : null}</span><b>{item}</b><small>{ready || index < 2 ? "Passed" : "Checking"}</small></div>)}</div></Drawer>;
}
function BrokerDrawer({ selected, onSelect, onClose, onConnect }) {
  return <Drawer title="Select Crypto Broker" eyebrow="Step 2 of 4" onClose={onClose} footer={<><Button tone="ghost" onClick={onClose}>Back</Button><Button disabled={!selected} onClick={onConnect}>Connect {selected || "broker"}</Button></>} wide><p className="drawer-intro">Choose the crypto exchange account this bot will execute on. Forex and binary brokers are out of scope.</p><div className="section-heading"><div><CurrencyBtc size={20}/><h3>Crypto Exchange Brokers</h3></div><StatusPill>6 available</StatusPill></div><div className="exchange-grid">{exchanges.map((exchange) => <button key={exchange.name} onClick={() => onSelect(exchange.name)} className={selected === exchange.name ? "is-selected" : ""}><span className="exchange-mark" style={{color:exchange.color,borderColor:`${exchange.color}44`,background:`${exchange.color}12`}}>{exchange.mark}</span><strong>{exchange.name}</strong>{selected === exchange.name ? <CheckCircle size={21} weight="fill"/> : null}</button>)}</div><div className="broker-note"><ShieldCheck size={25}/><div><b>Use restricted API credentials</b><p>Enable trading only. Never grant withdrawal permission to an automated trading connection.</p></div></div></Drawer>;
}
function CredentialsDrawer({ onClose, onConnect }) {
  const [mode, setMode] = useState("Demo / Testnet");
  return <Drawer title="Connect Binance" eyebrow="Broker authorization" onClose={onClose} footer={<><Button tone="ghost" onClick={onClose}>Back</Button><Button icon={LockKey} onClick={onConnect}>Verify connection</Button></>} wide><div className="connection-hero"><span className="exchange-mark exchange-mark--large">BN</span><div><h3>Binance account</h3><p>Futures trading account for BTCUSDT.</p></div><StatusPill tone="purple">Trading only</StatusPill></div><div className="form-section"><h3>Environment</h3><RadioCards options={["Demo / Testnet", "Live"]} value={mode} onChange={setMode}/></div><div className="form-grid"><Field label="API key" defaultValue="TF-DEMO-BINANCE-01"/><Field label="API secret" type="password" defaultValue="prototype-secret-key"/></div><div className="permission-list"><h3>Required permissions</h3><div><CheckCircle size={20} weight="fill"/><span><b>Read account and positions</b><small>Used for balance, margin and reconciliation.</small></span></div><div><CheckCircle size={20} weight="fill"/><span><b>Place and manage trades</b><small>Required to submit, cancel and close orders.</small></span></div><div className="is-blocked"><X size={20} weight="bold"/><span><b>Withdrawals disabled</b><small>This permission must never be enabled.</small></span></div></div><div className="info-callout"><LockKey size={22}/><span><b>Encrypted credential vault</b><small>This prototype does not send or store the values above.</small></span></div></Drawer>;
}

function SettingsNav({ current }) {
  return <div className="settings-nav">{settingsSteps.map((step,index) => { const Icon=step.icon; const active=current===step.id; const complete=settingsSteps.findIndex(s=>s.id===current)>index; return <div key={step.id} className={`${active?"is-active":""} ${complete?"is-complete":""}`}><span>{complete?<Check size={12} weight="bold"/>:index+1}</span><Icon size={16}/><b>{step.label}</b></div>; })}</div>;
}
function SettingsDrawer({ screen, onBack, onNext }) {
  const titles={settingsTrading:"Trading Settings",settingsGoals:"Goal Settings",settingsRisk:"Risk Management",settingsFilters:"Filters"}; const index=settingsSteps.findIndex(s=>s.id===screen);
  return <Drawer title="Bot Settings" eyebrow={`Step 3 of 4 · ${titles[screen]}`} onClose={onBack} footer={<><Button tone="ghost" icon={CaretLeft} onClick={onBack}>Back</Button><Button icon={ArrowRight} onClick={onNext}>{index===3?"Save and review":"Next"}</Button></>} wide><SettingsNav current={screen}/>{screen==="settingsTrading"?<TradingSettings/>:null}{screen==="settingsGoals"?<GoalSettings/>:null}{screen==="settingsRisk"?<RiskSettings/>:null}{screen==="settingsFilters"?<FilterSettings/>:null}</Drawer>;
}
function TradingSettings(){
  const [execution,setExecution]=useState("Market"); const [margin,setMargin]=useState("Cross"); const [leverage,setLeverage]=useState(15);
  return <div className="settings-form"><Field label="Bot Name" defaultValue="QPOTC"/><div className="form-section"><h3>Trade Settings</h3><Field label="Trading Pair"><span className="field__control"><select defaultValue="BTCUSDT"><option>BTCUSDT</option><option>ETHUSDT</option><option>SOLUSDT</option></select><CaretDown size={16}/></span></Field><Field label="Signal Execution"><RadioCards compact options={["Market","Limit","Next Minute"]} value={execution} onChange={setExecution}/></Field><Field label="Margin Mode"><RadioCards compact options={["Cross","Isolated"]} value={margin} onChange={setMargin}/></Field><label className="field"><span className="field__label">Leverage <b className="accent-value">{leverage}x</b></span><input className="range" type="range" min="1" max="75" value={leverage} onChange={e=>setLeverage(e.target.value)}/><span className="range-labels"><i>1x</i><i>15x</i><i>30x</i><i>45x</i><i>60x</i><i>75x</i></span></label><div className="metric-line"><span>Maximum position at current leverage</span><b>2,000,000 USDT</b></div><div className="form-grid"><Field label="Trading size" defaultValue="0.01" suffix="BTC" hint="Minimum quantity is 0.0001 BTC"/><Field label="Order value" defaultValue="1,594.82" suffix="USDT"/></div></div><div className="form-section"><h3>Closing Management</h3><div className="check-options"><label><input type="checkbox" defaultChecked/>Auto Close</label><label><input type="checkbox"/>Signal Closed</label></div><div className="form-grid"><Field label="Take Profit" defaultValue="50" suffix="% ROI" hint="≈ +79.74 USDT"/><Field label="Stop Loss" defaultValue="-50" suffix="% ROI" hint="≈ -79.74 USDT"/></div></div></div>;
}
function GoalSettings(){return <div className="settings-form"><div className="form-section"><div className="setting-illustration"><Target size={34} weight="duotone"/><div><h3>Stop automatically when a goal is reached</h3><p>These limits are evaluated using the reconciled account state.</p></div></div><Field label="Take profit at" defaultValue="500" suffix="USDT"/><RadioCards compact options={["Fixed Amount","% of Total Balance"]} value="Fixed Amount" onChange={()=>{}}/><Field label="Stop loss at" defaultValue="200" suffix="USDT"/><RadioCards compact options={["Fixed Amount","% of Total Balance"]} value="Fixed Amount" onChange={()=>{}}/></div></div>}
function RiskSettings(){const [compound,setCompound]=useState(true);const [martingale,setMartingale]=useState(false);return <div className="settings-form"><div className="strategy-card"><div><span className="toggle-icon"><Lightning size={20}/></span><div><h3>Compound Strategy</h3><p>Use eligible profit on the next signal.</p></div></div><button className={`switch ${compound?"on":""}`} onClick={()=>setCompound(!compound)}><span/></button>{compound?<div className="strategy-fields"><Field label="Profit turnover" defaultValue="100" suffix="%"/><Field label="Compounding steps" defaultValue="2" suffix="steps"/></div>:null}</div><div className="strategy-card"><div><span className="toggle-icon"><Activity size={20}/></span><div><h3>Martingale Management</h3><p>Increase size only after a losing result.</p></div></div><button className={`switch ${martingale?"on":""}`} onClick={()=>setMartingale(!martingale)}><span/></button>{martingale?<div className="strategy-fields"><Field label="Multiplier" defaultValue="2" suffix="x"/><Field label="Maximum steps" defaultValue="3" suffix="steps"/></div>:null}</div><div className="strategy-card"><div><span className="toggle-icon"><SquaresFour size={20}/></span><div><h3>Split Trade</h3><p>Divide the order amount into equal parts.</p></div></div><button className="switch"><span/></button></div><div className="warning-callout"><WarningCircle size={22}/><span><b>Risk acknowledgement</b><small>Higher leverage and progressive sizing can accelerate losses.</small></span></div></div>}
function FilterSettings(){const [news,setNews]=useState("High impact");return <div className="settings-form"><div className="form-section"><h3>News Filter</h3><RadioCards compact options={["High impact","Medium impact","Low impact"]} value={news} onChange={setNews}/><div className="form-grid"><Field label="Pause before impact" defaultValue="5" suffix="min"/><Field label="Resume after impact" defaultValue="5" suffix="min"/></div></div><div className="form-section"><h3>Trading Dates & Times</h3><Field label="Trading date" type="date" defaultValue="2026-09-08"/><div className="form-grid"><Field label="Start time" type="time" defaultValue="00:00"/><Field label="End time" type="time" defaultValue="23:59"/></div></div><div className="info-callout"><FunnelSimple size={22}/><span><b>Filter behavior</b><small>Filtered signals remain visible in the journal but are not submitted to Binance.</small></span></div></div>}

function ReviewModal({ onBack, onActivate }) {
  const groups=[["Signal",["TradingView","Webhook verified"]],["Exchange",["Binance","Demo · Futures"]],["Trading",["BTCUSDT · Market","0.01 BTC · Cross · 15x"]],["Protection",["TP +50% ROI","SL -50% ROI · Stop goal 200 USDT"]]];
  return <div className="overlay overlay--center"><div className="overlay__scrim"/><section className="review-modal"><header><span>Step 4 of 4</span><h2>Review your bot</h2><p>Confirm the execution route and risk controls before activation.</p></header><div className="review-route"><div><Broadcast size={24}/><b>TradingView</b></div><ArrowRight size={22}/><div><Robot size={24}/><b>QPOTC</b></div><ArrowRight size={22}/><div><CurrencyBtc size={24}/><b>Binance</b></div></div><div className="review-grid">{groups.map(([title,values])=><div key={title}><span>{title}</span><b>{values[0]}</b><small>{values[1]}</small></div>)}</div><div className="test-result"><CheckCircle size={22} weight="fill"/><span><b>Dry-run passed</b><small>Sample alert validated; no real order was placed.</small></span></div><footer><Button tone="ghost" icon={CaretLeft} onClick={onBack}>Edit settings</Button><Button icon={RocketLaunch} onClick={onActivate}>Continue to activation</Button></footer></section></div>;
}
function ActivationModal({ onBack, onConfirm }) {
  const [checked,setChecked]=useState(false);
  return <div className="overlay overlay--center"><div className="overlay__scrim"/><section className="review-modal activation-modal"><div className="activation-icon"><RocketLaunch size={34} weight="duotone"/></div><header><span>Final confirmation</span><h2>Activate QPOTC?</h2><p>The bot will listen for TradingView alerts and route approved demo orders to Binance.</p></header><div className="live-summary"><span><small>Environment</small><b>Demo / Testnet</b></span><span><small>Maximum order</small><b>0.01 BTC</b></span><span><small>Leverage</small><b>15x Cross</b></span></div><label className="confirm-check"><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/><span>I reviewed the exchange account, size, leverage and stop controls.</span></label><footer><Button tone="ghost" onClick={onBack}>Back</Button><Button icon={RocketLaunch} disabled={!checked} onClick={onConfirm}>Activate bot</Button></footer></section></div>;
}
function ActiveOverview({ onEdit }) {
  const lifecycle=["Signal received","Risk approved","Submitted","Filled"];
  return <div className="overview"><div className="overview__header"><div><StatusPill tone="green">Active · Demo</StatusPill><h1>QPOTC Bot Overview</h1><p>TradingView → Binance Futures · BTCUSDT</p></div><div><Button tone="ghost" onClick={onEdit}>Edit as draft</Button><Button icon={Pause}>Pause bot</Button></div></div><div className="overview-grid"><section className="metric-card"><span>Realized P&amp;L</span><b className="positive">+$216.30</b><small>Last 7 days</small></section><section className="metric-card"><span>Win rate</span><b>64%</b><small>8 wins · 1 loss</small></section><section className="metric-card"><span>Open position</span><b>BTCUSDT</b><small>Long · 0.01 BTC · 15x</small></section><section className="metric-card"><span>Connection</span><b className="positive">Healthy</b><small>Updated just now</small></section></div><div className="overview-main"><section className="position-card"><header><div><CurrencyBtc size={24}/><span><b>BTCUSDT</b><small>Perpetual · Cross 15x</small></span></div><StatusPill tone="green">Open long</StatusPill></header><div className="position-data"><span><small>Entry price</small><b>112,805.50</b></span><span><small>Mark price</small><b>113,124.22</b></span><span><small>Margin</small><b>106.32 USDT</b></span><span><small>Unrealized P&amp;L</small><b className="positive">+31.87 USDT</b></span></div><div className="position-levels"><span><i className="tp"/>TP 113,754.40</span><span><i className="current"/>Current 113,124.22</span><span><i className="sl"/>SL 112,805.50</span></div><footer><Button tone="ghost">Edit TP/SL</Button><Button tone="danger">Close position</Button></footer></section><section className="activity-card"><header><h3>Latest execution</h3><StatusPill>2 sec ago</StatusPill></header><div className="lifecycle">{lifecycle.map((item,index)=><div key={item}><span><Check size={12} weight="bold"/></span><b>{item}</b><small>{index===0?"TradingView alert #TV-4921":index===1?"All rules passed":index===2?"Client order TF-8401":"0.01 BTC @ 112,805.50"}</small></div>)}</div></section></div><section className="trades-table"><header><h3>Incoming signals &amp; orders</h3><button>View all activity <ArrowRight size={16}/></button></header><div className="table-row table-head"><span>Time</span><span>Signal</span><span>Order state</span><span>Size</span><span>Price</span><span>P&amp;L</span></div>{[["12:46:02","Buy BTCUSDT","Filled","0.01 BTC","112,805.50","+31.87"],["11:18:44","Close BTCUSDT","Filled","0.01 BTC","111,942.20","+79.74"],["09:04:11","Buy BTCUSDT","Filtered","—","—","—"]].map(row=><div className="table-row" key={row[0]}>{row.map((v,i)=><span key={i} className={i===5&&v.startsWith("+")?"positive":""}>{v}</span>)}</div>)}</section></div>;
}

export function App() {
  const [screen,setScreen]=useState("builder"); const [selectedBroker,setSelectedBroker]=useState("Binance");
  const signalReady=!(["builder","providers","tradingview","signalCheck"].includes(screen));
  const brokerReady=["brokerConnected","settingsTrading","settingsGoals","settingsRisk","settingsFilters","review","activation","active"].includes(screen);
  const nextSetting=()=>{const i=settingsSteps.findIndex(s=>s.id===screen);setScreen(i===3?"review":settingsSteps[i+1].id)};
  const backSetting=()=>{const i=settingsSteps.findIndex(s=>s.id===screen);setScreen(i===0?"brokerConnected":settingsSteps[i-1].id)};
  const main=screen==="active"?<ActiveOverview onEdit={()=>setScreen("settingsTrading")}/>:<BuilderCanvas signalReady={signalReady} brokerReady={brokerReady} onSignal={()=>setScreen("providers")} onBroker={()=>setScreen("brokers")} onSettings={()=>setScreen("settingsTrading")} onReview={()=>setScreen("review")}/>;
  return <Shell screen={screen} onActivate={()=>brokerReady&&setScreen("review")} onView={()=>setScreen(brokerReady?"review":"builder")}>{main}
    {screen==="providers"?<ProviderDrawer onClose={()=>setScreen("builder")} onTradingView={()=>setScreen("tradingview")}/>:null}
    {screen==="tradingview"?<TradingViewDrawer onClose={()=>setScreen("providers")} onConnect={()=>setScreen("signalCheck")}/>:null}
    {screen==="signalCheck"?<CheckDrawer type="signal" onDone={()=>setScreen("signalConnected")}/>:null}
    {screen==="brokers"?<BrokerDrawer selected={selectedBroker} onSelect={setSelectedBroker} onClose={()=>setScreen("signalConnected")} onConnect={()=>setScreen("brokerCredentials")}/>:null}
    {screen==="brokerCredentials"?<CredentialsDrawer onClose={()=>setScreen("brokers")} onConnect={()=>setScreen("brokerCheck")}/>:null}
    {screen==="brokerCheck"?<CheckDrawer type="broker" onDone={()=>setScreen("brokerConnected")}/>:null}
    {settingsSteps.some(s=>s.id===screen)?<SettingsDrawer screen={screen} onBack={backSetting} onNext={nextSetting}/>:null}
    {screen==="review"?<ReviewModal onBack={()=>setScreen("settingsFilters")} onActivate={()=>setScreen("activation")}/>:null}
    {screen==="activation"?<ActivationModal onBack={()=>setScreen("review")} onConfirm={()=>setScreen("active")}/>:null}
  </Shell>;
}
