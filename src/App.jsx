import { useEffect, useState } from "react";
import { ActivityIcon as Activity } from "@phosphor-icons/react/Pulse";
import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { Bell } from "@phosphor-icons/react/Bell";
import { Broadcast } from "@phosphor-icons/react/Broadcast";
import { ChartBar } from "@phosphor-icons/react/ChartBar";
import { Check } from "@phosphor-icons/react/Check";
import { CheckCircle } from "@phosphor-icons/react/CheckCircle";
import { ClipboardText } from "@phosphor-icons/react/ClipboardText";
import { CurrencyBtc } from "@phosphor-icons/react/CurrencyBtc";
import { GearSix } from "@phosphor-icons/react/GearSix";
import { House } from "@phosphor-icons/react/House";
import { Lightning } from "@phosphor-icons/react/Lightning";
import { LinkSimple } from "@phosphor-icons/react/LinkSimple";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { Pause } from "@phosphor-icons/react/Pause";
import { Plus } from "@phosphor-icons/react/Plus";
import { Power } from "@phosphor-icons/react/Power";
import { Robot } from "@phosphor-icons/react/Robot";
import { ShieldCheck } from "@phosphor-icons/react/ShieldCheck";
import { SlidersHorizontal } from "@phosphor-icons/react/SlidersHorizontal";
import { Users } from "@phosphor-icons/react/Users";
import { WarningCircle } from "@phosphor-icons/react/WarningCircle";

const steps = [
  ["Create Bot", "Name and identify the bot", Plus],
  ["Choose Signal Source", "TradingView, MT4, MT5, or other", Activity],
  ["Connect Broker", "Authenticate and select account", LinkSimple],
  ["Configure Strategy", "Asset, direction, amount, execution", SlidersHorizontal],
  ["Set Risk Controls", "Limits, stops, advanced rules", ShieldCheck],
  ["Review Setup", "Resolve blockers before activation", ClipboardText],
  ["Activate Bot", "Confirm and launch", Power],
  ["Monitor Performance", "Results, health, adjustments", ChartBar],
];

function Button({ children, tone = "primary", icon: Icon, ...props }) {
  return <button className={`button button--${tone}`} {...props}>{Icon ? <Icon size={18} weight="bold" /> : null}<span>{children}</span></button>;
}

function Shell({ step, children }) {
  return <div className="shell">
    <aside className="sidebar"><div className="brand"><span /><b>TraderFrame</b></div><button className="new-bot"><Plus size={18} /> New bot</button><nav><small>Workspace</small><button><House size={19} /> Overview</button><button><Users size={19} /> Copy trading</button><button className="active"><Robot size={19} /> Bots <em>5</em></button><button><ChartBar size={19} /> Analytics</button></nav><div className="sidebar-spacer" /><div className="profile"><span>AS</span><div><b>Alex Smith</b><small>Demo workspace</small></div></div></aside>
    <header className="topbar"><div className="search"><MagnifyingGlass size={17} /><input aria-label="Search" placeholder="Search" /></div><span className="prototype-pill">Frontend prototype</span><button aria-label="Notifications"><Bell size={19} /></button><Button>Upgrade</Button></header>
    <div className="page"><div className="page-heading"><div><span className="eyebrow">CREATE AUTOMATION</span><h1>{step === 7 ? "Bot performance" : "Create a trading bot"}</h1><p>{step === 7 ? "Monitor the live simulation and inspect operational edge states." : "Eight required checkpoints from setup to monitoring."}</p></div><span className="save-state"><i /> Draft saved locally</span></div>{children}</div>
  </div>;
}

function Progress({ step }) {
  return <aside className="progress"><div className="progress-line"><i style={{ height: `${(step / 7) * 100}%` }} /></div>{steps.map(([name, note, Icon], index) => <div key={name} className={`progress-step ${index === step ? "current" : ""} ${index < step ? "done" : ""}`}><span>{index < step ? <Check size={14} weight="bold" /> : <Icon size={18} />}</span><div><small>STEP {String(index + 1).padStart(2, "0")}</small><b>{name}</b><em>{note}</em></div></div>)}</aside>;
}

function DependencyPanel({ step, data }) {
  const rows = [
    ["Bot record", Boolean(data.name)],
    ["Signal verified", data.signalConnected],
    ["Broker verified", data.brokerConnected],
    ["Strategy valid", step > 3],
    ["Risk rules valid", step > 4],
  ];
  return <aside className="dependency-panel"><header><span className="eyebrow">DEPENDENCIES</span><h3>Activation readiness</h3></header><div className="dependency-list">{rows.map(([label, ok], index) => <div key={label}><span className={ok ? "ok" : step === index ? "current" : ""}>{ok ? <Check size={12} /> : index + 1}</span><b>{label}</b><small>{ok ? "Ready" : "Required"}</small></div>)}</div><div className="constraint-note"><WarningCircle size={19} /><span><b>Execution order is enforced</b><small>Later steps remain blocked until their upstream dependency succeeds.</small></span></div><div className="dev-note"><b>Developer feedback focus</b><p>Check validation timing, retry behavior, locked-step clarity, and which values must persist between steps.</p></div></aside>;
}

function Layout({ step, data, children }) {
  return <div className="workflow-layout"><Progress step={step} /><main>{children}</main><DependencyPanel step={step} data={data} /></div>;
}

function StepCard({ number, title, description, children, back, next, nextLabel = "Continue", nextDisabled = false, nextIcon = ArrowRight }) {
  return <section className="step-card"><header><span>{String(number).padStart(2, "0")}</span><div><h2>{title}</h2><p>{description}</p></div></header><div className="step-body">{children}</div><footer>{back ? <Button tone="ghost" icon={ArrowLeft} onClick={back}>Back</Button> : <span />}<Button icon={nextIcon} onClick={next} disabled={nextDisabled}>{nextLabel}</Button></footer></section>;
}

function Field({ label, error, suffix, children, ...props }) {
  return <label className={`field ${error ? "has-error" : ""}`}><span>{label}</span>{children || <div><input {...props} />{suffix ? <b>{suffix}</b> : null}</div>}{error ? <small><WarningCircle size={13} />{error}</small> : null}</label>;
}

function CreateStep({ data, setData, next }) {
  const [error, setError] = useState("");
  const submit = () => { if (!data.name.trim()) return setError("Bot name is required."); if (data.name.toLowerCase() === "grid runner") return setError("This name already exists. Choose a unique name."); setError(""); next(); };
  return <StepCard number={1} title="Create your bot" description="Create the bot record first. Every later setting depends on this identity." next={submit} nextLabel="Create and continue">
    <div className="intro-banner"><span><Robot size={30} weight="duotone" /></span><div><b>Start with a clear bot identity</b><small>The name is shown in alerts, orders, logs, and monitoring.</small></div></div>
    <Field label="Bot name" error={error}><div><input aria-label="Bot name" value={data.name} placeholder="e.g. BTC Momentum" onChange={e => { setData({ ...data, name: e.target.value }); setError(""); }} /><span className="counter">{data.name.length}/32</span></div></Field>
    <Field label="Description (optional)"><textarea aria-label="Description" value={data.description} placeholder="What should this bot do?" onChange={e => setData({ ...data, description: e.target.value })} /></Field>
    <button className="edge-link" onClick={() => { setData({ ...data, name: "Grid Runner" }); setError(""); }}>Preview duplicate-name edge case</button>
  </StepCard>;
}

function SignalStep({ data, setData, back, next }) {
  const [status, setStatus] = useState(data.signalConnected ? "success" : "idle"); const [fail, setFail] = useState(false);
  useEffect(() => { if (status !== "checking") return; const id = setTimeout(() => setStatus(fail ? "error" : "success"), 850); return () => clearTimeout(id); }, [status, fail]);
  useEffect(() => { if (status === "success") setData(current => current.signalConnected ? current : { ...current, signalConnected: true }); }, [status, setData]);
  const sources = [["TradingView", "Webhook alerts", Broadcast], ["MT5", "Expert Advisor", Activity], ["MT4", "Legacy terminal", Activity], ["Other", "Custom webhook", LinkSimple]];
  return <StepCard number={2} title="Choose and verify a signal source" description="A source must deliver a valid test signal before broker setup unlocks." back={back} next={next} nextDisabled={status !== "success"} nextLabel="Continue to broker">
    <div className="choice-grid four">{sources.map(([name, note, Icon]) => <button key={name} className={data.source === name ? "selected" : ""} onClick={() => { setData({ ...data, source: name, signalConnected: false }); setStatus("idle"); }}><Icon size={23} /><b>{name}</b><small>{note}</small>{data.source === name ? <CheckCircle size={19} weight="fill" /> : null}</button>)}</div>
    {data.source ? <><div className="form-grid"><Field label={data.source === "TradingView" || data.source === "Other" ? "Webhook URL" : "Terminal ID"} defaultValue={data.source === "TradingView" ? "https://signal.traderframe.dev/bot" : "TF-DEMO-1024"} /><Field label="Verification token" defaultValue="TF-TEST-83A2" /></div><label className="test-toggle"><input type="checkbox" checked={fail} onChange={e => setFail(e.target.checked)} /> Simulate signal timeout</label><ConnectionState status={status} idle="Send test signal" checking="Waiting for signal…" success="Test signal received" error="No signal received within 30 seconds" onAction={() => setStatus("checking")} /></> : <EmptyState icon={Broadcast} title="Select a signal source" text="Connection fields will appear after you make a selection." />}
  </StepCard>;
}

function ConnectionState({ status, idle, checking, success, error, onAction }) {
  if (status === "success") return <div className="state-box success"><CheckCircle size={22} weight="fill" /><span><b>{success}</b><small>Dependency verified. You can continue.</small></span></div>;
  if (status === "error") return <div className="state-box error"><WarningCircle size={22} weight="fill" /><span><b>{error}</b><small>Check the configuration, then retry.</small></span><Button tone="ghost" onClick={onAction}>Retry</Button></div>;
  return <div className={`state-box ${status}`}><Lightning size={22} /><span><b>{status === "checking" ? checking : "Verification required"}</b><small>{status === "checking" ? "Keep this screen open." : "This frontend check simulates the backend handshake."}</small></span><Button tone="ghost" onClick={onAction} disabled={status === "checking"}>{status === "checking" ? "Checking…" : idle}</Button></div>;
}

function EmptyState({ icon: Icon, title, text }) { return <div className="empty-state"><Icon size={31} weight="duotone" /><b>{title}</b><small>{text}</small></div>; }

function BrokerStep({ data, setData, back, next }) {
  const [status, setStatus] = useState(data.brokerConnected ? "success" : "idle"); const [fail, setFail] = useState(false);
  useEffect(() => { if (status !== "checking") return; const id = setTimeout(() => setStatus(fail ? "error" : "success"), 850); return () => clearTimeout(id); }, [status, fail]);
  useEffect(() => { if (status === "success") setData(current => current.brokerConnected ? current : { ...current, brokerConnected: true }); }, [status, setData]);
  return <StepCard number={3} title="Connect a broker account" description="Select a broker, authenticate, then choose the exact execution account." back={back} next={next} nextDisabled={status !== "success" || !data.account} nextLabel="Use this account">
    <div className="choice-grid"><button className={data.broker === "Binance" ? "selected" : ""} onClick={() => { setData({ ...data, broker: "Binance", brokerConnected: false }); setStatus("idle"); }}><CurrencyBtc size={23} /><b>Binance</b><small>Spot & Futures</small>{data.broker === "Binance" ? <CheckCircle size={19} weight="fill" /> : null}</button><button className={data.broker === "Kraken" ? "selected" : ""} onClick={() => { setData({ ...data, broker: "Kraken", brokerConnected: false }); setStatus("idle"); }}><CurrencyBtc size={23} /><b>Kraken</b><small>Spot trading</small>{data.broker === "Kraken" ? <CheckCircle size={19} weight="fill" /> : null}</button><button disabled><Plus size={23} /><b>More brokers</b><small>Coming later</small></button></div>
    {data.broker ? <><div className="form-grid"><Field label="API key" defaultValue="TF-DEMO-KEY" /><Field label="API secret"><div><input aria-label="API secret" type="password" defaultValue="prototype-secret" /></div></Field></div><label className="test-toggle"><input type="checkbox" checked={fail} onChange={e => setFail(e.target.checked)} /> Simulate invalid API credentials</label><ConnectionState status={status} idle="Authenticate broker" checking="Authenticating…" success={`${data.broker} authenticated`} error="Authentication failed: invalid API credentials" onAction={() => setStatus("checking")} />{status === "success" ? <Field label="Execution account"><select aria-label="Execution account" value={data.account} onChange={e => setData({ ...data, account: e.target.value })}><option value="">Select an account</option><option value="Demo Futures · 8,420 USDT">Demo Futures · 8,420 USDT</option><option value="Demo Spot · 1.24 BTC">Demo Spot · 1.24 BTC</option></select></Field> : null}</> : <EmptyState icon={LinkSimple} title="Choose a broker" text="Authentication and account selection appear next." />}
  </StepCard>;
}

function StrategyStep({ data, setData, back, next }) {
  const [submitted, setSubmitted] = useState(false); const amount = Number(data.amount); const error = submitted && (!amount || amount > 1) ? (!amount ? "Enter a trade amount greater than zero." : "Amount exceeds the available demo balance.") : "";
  const submit = () => { setSubmitted(true); if (amount > 0 && amount <= 1) next(); };
  return <StepCard number={4} title="Configure the strategy" description="Define what to trade and how every valid signal becomes an order." back={back} next={submit} nextLabel="Save strategy">
    <div className="form-grid"><Field label="Asset"><select aria-label="Asset" value={data.asset} onChange={e => setData({ ...data, asset: e.target.value })}><option>BTCUSDT</option><option>ETHUSDT</option><option>SOLUSDT</option></select></Field><Field label="Direction"><div className="segments">{["Long", "Short", "Both"].map(x => <button key={x} className={data.direction === x ? "selected" : ""} onClick={() => setData({ ...data, direction: x })}>{x}</button>)}</div></Field></div>
    <div className="form-grid"><Field label="Trade amount" suffix="BTC" error={error}><div><input aria-label="Trade amount" value={data.amount} onChange={e => { setData({ ...data, amount: e.target.value }); setSubmitted(false); }} /><b>BTC</b></div></Field><Field label="Execution"><select aria-label="Execution" value={data.execution} onChange={e => setData({ ...data, execution: e.target.value })}><option>Market</option><option>Limit</option><option>Next candle</option></select></Field></div>
    <div className="estimate"><span><small>Estimated order value</small><b>{amount && amount <= 1 ? `${(amount * 112805).toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT` : "Unavailable"}</b></span><span><small>Available balance</small><b>8,420 USDT</b></span></div>
    <button className="edge-link" onClick={() => { setData({ ...data, amount: "2.5" }); setSubmitted(true); }}>Preview insufficient-balance edge case</button>
  </StepCard>;
}

function RiskStep({ data, setData, back, next }) {
  const [submitted, setSubmitted] = useState(false); const sl = Number(data.stopLoss); const daily = Number(data.dailyLoss); const invalid = sl <= 0 || sl > 20 || daily <= 0;
  const submit = () => { setSubmitted(true); if (!invalid) next(); };
  return <StepCard number={5} title="Set risk controls" description="Protection rules are mandatory and run before every order submission." back={back} next={submit} nextLabel="Validate risk controls">
    <div className="risk-banner"><ShieldCheck size={25} /><span><b>Hard stop rules</b><small>These controls cannot be bypassed by an incoming signal.</small></span></div>
    <div className="form-grid"><Field label="Stop loss" suffix="%" error={submitted && (sl <= 0 || sl > 20) ? "Enter a value between 0.1% and 20%." : ""}><div><input aria-label="Stop loss" value={data.stopLoss} onChange={e => { setData({ ...data, stopLoss: e.target.value }); setSubmitted(false); }} /><b>%</b></div></Field><Field label="Take profit" suffix="%"><div><input aria-label="Take profit" value={data.takeProfit} onChange={e => setData({ ...data, takeProfit: e.target.value })} /><b>%</b></div></Field></div>
    <div className="form-grid"><Field label="Daily loss limit" suffix="USDT" error={submitted && daily <= 0 ? "A positive daily loss limit is required." : ""}><div><input aria-label="Daily loss limit" value={data.dailyLoss} onChange={e => { setData({ ...data, dailyLoss: e.target.value }); setSubmitted(false); }} /><b>USDT</b></div></Field><Field label="Maximum open positions"><select aria-label="Maximum open positions" defaultValue="1"><option>1</option><option>2</option><option>3</option></select></Field></div>
    <label className="advanced-rule"><input type="checkbox" checked={data.newsPause} onChange={e => setData({ ...data, newsPause: e.target.checked })} /><span><b>Pause around high-impact news</b><small>Block orders five minutes before and after an event.</small></span></label>
    <button className="edge-link" onClick={() => { setData({ ...data, stopLoss: "0", dailyLoss: "0" }); setSubmitted(true); }}>Preview invalid-risk edge case</button>
  </StepCard>;
}

function ReviewStep({ data, back, next, edit }) {
  const groups = [["Bot", data.name, data.description || "No description"], ["Signal", data.source, "Test signal verified"], ["Broker", data.broker, data.account], ["Strategy", `${data.direction} ${data.asset}`, `${data.amount} BTC · ${data.execution}`], ["Risk", `SL ${data.stopLoss}% · TP ${data.takeProfit}%`, `Daily limit ${data.dailyLoss} USDT`]];
  return <StepCard number={6} title="Review the complete setup" description="Everything below must remain valid at activation time." back={back} next={next} nextLabel="Confirm setup">
    <div className="review-grid">{groups.map(([title, value, note], index) => <div key={title}><span><CheckCircle size={19} weight="fill" /><small>{title}</small></span><b>{value}</b><em>{note}</em><button onClick={() => edit(index === 0 ? 0 : index === 1 ? 1 : index === 2 ? 2 : index === 3 ? 3 : 4)}>Edit</button></div>)}</div>
    <div className="state-box success"><CheckCircle size={22} weight="fill" /><span><b>All dependencies passed</b><small>Revalidation will run once more during activation.</small></span></div>
  </StepCard>;
}

function ActivateStep({ data, back, next }) {
  const [confirmed, setConfirmed] = useState(false); const [fail, setFail] = useState(false); const [status, setStatus] = useState("idle");
  useEffect(() => { if (status !== "checking") return; const id = setTimeout(() => { if (fail) setStatus("error"); else { setStatus("success"); setTimeout(next, 500); } }, 900); return () => clearTimeout(id); }, [status, fail]);
  return <StepCard number={7} title={`Activate ${data.name}`} description="Activation performs a final dependency check, then starts the monitoring session." back={status === "checking" ? undefined : back} next={() => setStatus("checking")} nextLabel={status === "checking" ? "Activating…" : status === "error" ? "Retry activation" : "Activate bot"} nextDisabled={!confirmed || status === "checking"} nextIcon={Power}>
    <div className="activation-card"><Power size={34} weight="duotone" /><div><b>Ready to launch in Demo</b><small>{data.source} → {data.broker} · {data.asset}</small></div></div>
    <div className="activation-facts"><span><small>Account</small><b>{data.account}</b></span><span><small>Maximum order</small><b>{data.amount} BTC</b></span><span><small>Hard stop</small><b>{data.dailyLoss} USDT/day</b></span></div>
    <label className="confirm"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} /><span><b>I reviewed the account, position size, and risk limits.</b><small>This acknowledgement is required and should be audit logged by the backend.</small></span></label>
    <label className="test-toggle"><input type="checkbox" checked={fail} onChange={e => setFail(e.target.checked)} /> Simulate activation service failure</label>
    {status === "error" ? <div className="state-box error"><WarningCircle size={22} weight="fill" /><span><b>Activation failed</b><small>The setup is preserved. Retry without re-entering data.</small></span></div> : status === "checking" ? <div className="state-box checking"><Lightning size={22} /><span><b>Revalidating dependencies…</b><small>Signal, broker, strategy, and risk checks are running.</small></span></div> : null}
  </StepCard>;
}

function MonitorStep({ data, edit }) {
  const [paused, setPaused] = useState(false); const [disconnected, setDisconnected] = useState(false); const [empty, setEmpty] = useState(false);
  return <div className="monitor"><header><div><span className={`live-pill ${paused || disconnected ? "warning" : ""}`}>{disconnected ? "Connection lost" : paused ? "Paused" : "Active · Demo"}</span><h2>{data.name}</h2><p>{data.source} → {data.broker} · {data.asset}</p></div><div><Button tone="ghost" icon={GearSix} onClick={() => edit(3)}>Adjust strategy</Button><Button icon={paused ? Power : Pause} onClick={() => setPaused(!paused)}>{paused ? "Resume bot" : "Pause bot"}</Button></div></header>
    {disconnected ? <div className="disconnect-banner"><WarningCircle size={22} /><span><b>Broker connection interrupted</b><small>New signals are queued and no orders will be submitted until reconnection succeeds.</small></span><Button tone="ghost" onClick={() => setDisconnected(false)}>Reconnect</Button></div> : null}
    <div className="metric-grid"><div><small>Realized P&amp;L</small><b className="positive">+$216.30</b><span>Last 7 days</span></div><div><small>Win rate</small><b>{empty ? "—" : "64%"}</b><span>{empty ? "No completed trades" : "8 wins · 1 loss"}</span></div><div><small>Open position</small><b>{empty ? "None" : "BTCUSDT"}</b><span>{empty ? "Waiting for signal" : "Long · 0.01 BTC"}</span></div><div><small>Connection</small><b className={disconnected ? "negative" : "positive"}>{disconnected ? "Offline" : "Healthy"}</b><span>Checked just now</span></div></div>
    {empty ? <EmptyState icon={ChartBar} title="No execution activity yet" text="The bot is active and waiting for its first valid signal." /> : <div className="monitor-grid"><section><header><h3>Latest execution</h3><span>2 sec ago</span></header>{[["Signal received", "TradingView alert #TV-4921"], ["Risk approved", "All hard stops passed"], ["Order filled", "0.01 BTC @ 112,805.50"]].map(([title, note]) => <div className="timeline-row" key={title}><span><Check size={12} /></span><div><b>{title}</b><small>{note}</small></div></div>)}</section><section><header><h3>Risk health</h3><ShieldCheck size={20} /></header><div className="risk-meter"><i style={{ width: "28%" }} /></div><div className="risk-data"><span><small>Daily loss used</small><b>56 / {data.dailyLoss} USDT</b></span><span><small>Open positions</small><b>1 / 1</b></span><span><small>Next news pause</small><b>14:25 UTC</b></span></div></section></div>}
    <div className="state-tools"><span><b>Frontend edge-state preview</b><small>Use these switches during developer feedback.</small></span><label><input type="checkbox" checked={disconnected} onChange={e => setDisconnected(e.target.checked)} /> Connection loss</label><label><input type="checkbox" checked={empty} onChange={e => setEmpty(e.target.checked)} /> Empty activity</label></div>
  </div>;
}

export function App() {
  const [step, setStep] = useState(0); const [data, setData] = useState({ name: "", description: "", source: "", signalConnected: false, broker: "", brokerConnected: false, account: "", asset: "BTCUSDT", direction: "Long", amount: "0.01", execution: "Market", stopLoss: "2", takeProfit: "4", dailyLoss: "200", newsPause: true });
  const next = () => setStep(value => Math.min(7, value + 1)); const back = () => setStep(value => Math.max(0, value - 1));
  let content;
  if (step === 0) content = <CreateStep data={data} setData={setData} next={next} />;
  else if (step === 1) content = <SignalStep data={data} setData={setData} back={back} next={next} />;
  else if (step === 2) content = <BrokerStep data={data} setData={setData} back={back} next={next} />;
  else if (step === 3) content = <StrategyStep data={data} setData={setData} back={back} next={next} />;
  else if (step === 4) content = <RiskStep data={data} setData={setData} back={back} next={next} />;
  else if (step === 5) content = <ReviewStep data={data} back={back} next={next} edit={setStep} />;
  else if (step === 6) content = <ActivateStep data={data} back={back} next={next} />;
  else content = <MonitorStep data={data} edit={setStep} />;
  return <Shell step={step}>{step === 7 ? content : <Layout step={step} data={data}>{content}</Layout>}</Shell>;
}
