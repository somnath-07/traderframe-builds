import { useEffect, useState } from "react";
import { ActivityIcon as Activity } from "@phosphor-icons/react/Pulse";
import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
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
import { LockKey } from "@phosphor-icons/react/LockKey";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { Pause } from "@phosphor-icons/react/Pause";
import { Plus } from "@phosphor-icons/react/Plus";
import { Power } from "@phosphor-icons/react/Power";
import { Robot } from "@phosphor-icons/react/Robot";
import { ShieldCheck } from "@phosphor-icons/react/ShieldCheck";
import { SlidersHorizontal } from "@phosphor-icons/react/SlidersHorizontal";
import { WarningCircle } from "@phosphor-icons/react/WarningCircle";

const stepMeta = [
  ["Create Bot", "Create the bot identity", Plus],
  ["Choose Signal Source", "Select and test a source", Activity],
  ["Connect Broker", "Authenticate and select account", LinkSimple],
  ["Configure Strategy", "Asset, direction, size, execution", SlidersHorizontal],
  ["Set Risk Controls", "Limits, stops, advanced rules", ShieldCheck],
  ["Review Setup", "Resolve blockers", ClipboardText],
  ["Activate Bot", "Confirm and launch", Power],
  ["Monitor Performance", "Track health and results", ChartBar],
];

const initialData = {
  name: "", source: "", broker: "", account: "", asset: "BTCUSDT",
  direction: "Long", amount: "0.01", execution: "Market",
  stopLoss: "2", takeProfit: "4", dailyLoss: "200",
};

function Button({ children, tone = "primary", icon: Icon, ...props }) {
  return <button className={`button button--${tone}`} {...props}>
    {Icon ? <Icon size={17} weight="bold" /> : null}<span>{children}</span>
  </button>;
}

function Field({ label, error, suffix, children, ...props }) {
  return <label className={`field ${error ? "has-error" : ""}`}>
    <span>{label}</span>
    {children || <div><input {...props} />{suffix ? <b>{suffix}</b> : null}</div>}
    {error ? <small><WarningCircle size={13} />{error}</small> : null}
  </label>;
}

function Chrome({ children, active }) {
  return <div className="app">
    <aside className="rail">
      <div className="rail-brand"><span /></div>
      <button className="rail-create"><Plus size={18} /></button>
      <nav><button><House size={19} /></button><button className="selected"><Robot size={19} /></button><button><ChartBar size={19} /></button><button><GearSix size={19} /></button></nav>
      <div className="rail-count"><b>5</b><small>Bots</small></div>
    </aside>
    <header className="topbar">
      <div className="search"><MagnifyingGlass size={16} /><input aria-label="Search" placeholder="Search TraderFrame" /></div>
      <span className="mode">Demo</span><Button>Upgrade</Button><span className="avatar">AS</span>
    </header>
    <section className="statusbar">
      <div><Robot size={20} /><b>{active ? "Active bot" : "New bot draft"}</b></div>
      <div><span><small>Required steps</small><b>8</b></span><span><small>Environment</small><b>Demo</b></span></div>
      <span className={active ? "active-status" : "draft-status"}>{active ? "Active" : "Frontend only"}</span>
    </section>
    {children}
  </div>;
}

function JourneyCanvas({ step, maxStep, errors, goTo, reset }) {
  return <main className="canvas">
    <div className="canvas-toolbar">
      <div><span className="eyebrow">8-STEP EXECUTION MAP</span><h1>Crypto bot journey</h1><p>Click any completed checkpoint to inspect it. Locked steps show their dependency.</p></div>
      <Button tone="ghost" onClick={reset}>Restart prototype</Button>
    </div>
    <div className="journey-grid">
      {stepMeta.map(([title, note, Icon], index) => {
        const locked = index > maxStep;
        const done = index < maxStep || maxStep === 7;
        return <button key={title} disabled={locked} onClick={() => goTo(index)} className={`journey-node ${index === step ? "current" : ""} ${done ? "done" : ""} ${errors[index] ? "node-error" : ""}`}>
          <span className="node-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="node-icon"><Icon size={24} weight="duotone" /></span>
          <span><b>{title}</b><small>{locked ? `Complete step ${index} first` : note}</small></span>
          {done ? <CheckCircle size={19} weight="fill" /> : locked ? <LockKey size={17} /> : <ArrowRight size={17} />}
        </button>;
      })}
    </div>
    <div className="canvas-legend"><span><i className="legend-current" />Current</span><span><i className="legend-done" />Completed</span><span><i />Locked by dependency</span></div>
  </main>;
}

function Drawer({ step, children, back, next, nextLabel, nextDisabled }) {
  const [title, note, Icon] = stepMeta[step];
  return <aside className="drawer">
    <header><div className="drawer-step"><Icon size={22} /></div><div><span>STEP {String(step + 1).padStart(2, "0")} OF 08</span><h2>{title}</h2><p>{note}</p></div></header>
    <div className="drawer-body">{children}</div>
    {step < 7 ? <footer>{back ? <Button tone="ghost" icon={ArrowLeft} onClick={back}>Back</Button> : <span />}<Button icon={step === 6 ? Power : ArrowRight} onClick={next} disabled={nextDisabled}>{nextLabel || "Continue"}</Button></footer> : null}
  </aside>;
}

function VerifyBox({ status, fail, setFail, run, success, error }) {
  if (status === "success") return <div className="state success"><CheckCircle size={21} weight="fill" /><span><b>{success}</b><small>Dependency verified. The next step is unlocked.</small></span></div>;
  if (status === "error") return <div className="state error"><WarningCircle size={21} weight="fill" /><span><b>{error}</b><small>Inputs are preserved for retry.</small></span><Button tone="ghost" onClick={() => { setFail(false); run(); }}>Retry</Button></div>;
  return <><label className="test-toggle"><input type="checkbox" checked={fail} onChange={e => setFail(e.target.checked)} /> Simulate connection failure</label><div className={`state ${status}`}><Lightning size={21} /><span><b>{status === "checking" ? "Checking dependency…" : "Connection test required"}</b><small>{status === "checking" ? "Keep this panel open." : "No backend request is sent."}</small></span><Button tone="ghost" onClick={run} disabled={status === "checking"}>{status === "checking" ? "Checking…" : "Run test"}</Button></div></>;
}

function Monitor({ data }) {
  const [paused, setPaused] = useState(false);
  const [offline, setOffline] = useState(false);
  const [empty, setEmpty] = useState(false);
  return <div className="monitor-panel">
    <div className={`monitor-status ${offline ? "error" : ""}`}><span><b>{offline ? "Broker disconnected" : paused ? "Bot paused" : "Bot active · Demo"}</b><small>{offline ? "Signals are queued; no orders are submitted." : `${data.source} → ${data.broker} · ${data.asset}`}</small></span>{offline ? <Button tone="ghost" onClick={() => setOffline(false)}>Reconnect</Button> : <Button icon={paused ? Power : Pause} onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</Button>}</div>
    <div className="metric-grid"><div><small>Realized P&amp;L</small><b className="positive">+$216.30</b></div><div><small>Win rate</small><b>{empty ? "—" : "64%"}</b></div><div><small>Open position</small><b>{empty ? "None" : "BTCUSDT"}</b></div></div>
    {empty ? <div className="empty-state"><ChartBar size={30} /><b>No execution activity</b><small>The bot is waiting for its first valid signal.</small></div> : <div className="timeline">{[["Signal received", "TradingView alert #TV-4921"], ["Risk approved", "All controls passed"], ["Order filled", "0.01 BTC @ 112,805.50"]].map(([title, note]) => <div key={title}><span><Check size={12} /></span><div><b>{title}</b><small>{note}</small></div></div>)}</div>}
    <div className="edge-lab"><b>Edge-state lab</b><label><input type="checkbox" checked={offline} onChange={e => setOffline(e.target.checked)} /> Connection lost</label><label><input type="checkbox" checked={empty} onChange={e => setEmpty(e.target.checked)} /> Empty activity</label></div>
  </div>;
}

export function App() {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [nameError, setNameError] = useState("");
  const [signalStatus, setSignalStatus] = useState("idle");
  const [brokerStatus, setBrokerStatus] = useState("idle");
  const [signalFail, setSignalFail] = useState(false);
  const [brokerFail, setBrokerFail] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [activationFail, setActivationFail] = useState(false);
  const [activationError, setActivationError] = useState(false);

  useEffect(() => {
    if (signalStatus !== "checking") return;
    const id = setTimeout(() => setSignalStatus(signalFail ? "error" : "success"), 800);
    return () => clearTimeout(id);
  }, [signalStatus, signalFail]);

  useEffect(() => {
    if (brokerStatus !== "checking") return;
    const id = setTimeout(() => setBrokerStatus(brokerFail ? "error" : "success"), 800);
    return () => clearTimeout(id);
  }, [brokerStatus, brokerFail]);

  const advance = () => {
    const next = Math.min(7, step + 1);
    setMaxStep(value => Math.max(value, next));
    setStep(next);
  };

  const reset = () => {
    setStep(0); setMaxStep(0); setData(initialData); setNameError("");
    setSignalStatus("idle"); setBrokerStatus("idle"); setConfirmed(false); setActivationError(false);
  };

  const errors = { 0: Boolean(nameError), 1: signalStatus === "error", 2: brokerStatus === "error", 3: step === 3 && Boolean(formError), 4: step === 4 && Boolean(formError), 6: activationError };
  let body;
  let next = advance;
  let nextLabel = "Continue";
  let nextDisabled = false;

  if (step === 0) {
    next = () => {
      if (!data.name.trim()) return setNameError("Bot name is required.");
      if (data.name.toLowerCase() === "grid runner") return setNameError("This bot name already exists.");
      setNameError(""); advance();
    };
    nextLabel = "Create bot";
    body = <><div className="intro-card"><Robot size={29} /><span><b>Create the bot identity first</b><small>The name will appear in alerts, orders, and monitoring.</small></span></div><Field label="Bot name" error={nameError}><div><input aria-label="Bot name" value={data.name} placeholder="e.g. BTC Momentum" onChange={e => { setData({ ...data, name: e.target.value }); setNameError(""); }} /><b>{data.name.length}/32</b></div></Field><button className="edge-link" onClick={() => { setData({ ...data, name: "Grid Runner" }); setNameError(""); }}>Preview duplicate-name error</button></>;
  } else if (step === 1) {
    nextDisabled = signalStatus !== "success";
    body = <><div className="choice-grid">{[["TradingView", Broadcast], ["MT5", Activity], ["MT4", Activity], ["Other", LinkSimple]].map(([name, Icon]) => <button key={name} className={data.source === name ? "selected" : ""} onClick={() => { setData({ ...data, source: name }); setSignalStatus("idle"); }}><Icon size={22} /><b>{name}</b>{data.source === name ? <CheckCircle size={18} weight="fill" /> : null}</button>)}</div>{data.source ? <><Field label={data.source === "TradingView" || data.source === "Other" ? "Webhook URL" : "Terminal ID"} defaultValue={data.source === "TradingView" ? "https://signal.traderframe.dev/bot" : "TF-DEMO-1024"} /><VerifyBox status={signalStatus} fail={signalFail} setFail={setSignalFail} run={() => setSignalStatus("checking")} success="Test signal received" error="No signal received within 30 seconds" /></> : <div className="empty-state"><Broadcast size={30} /><b>Select a source</b><small>Connection fields appear after selection.</small></div>}</>;
  } else if (step === 2) {
    nextDisabled = brokerStatus !== "success" || !data.account;
    body = <><div className="choice-grid brokers">{["Binance", "Kraken"].map(name => <button key={name} className={data.broker === name ? "selected" : ""} onClick={() => { setData({ ...data, broker: name, account: "" }); setBrokerStatus("idle"); }}><CurrencyBtc size={22} /><b>{name}</b>{data.broker === name ? <CheckCircle size={18} weight="fill" /> : null}</button>)}</div>{data.broker ? <><div className="form-grid"><Field label="API key" defaultValue="TF-DEMO-KEY" /><Field label="API secret"><div><input aria-label="API secret" type="password" defaultValue="prototype-secret" /></div></Field></div><VerifyBox status={brokerStatus} fail={brokerFail} setFail={setBrokerFail} run={() => setBrokerStatus("checking")} success={`${data.broker} authenticated`} error="Authentication failed: invalid API credentials" />{brokerStatus === "success" ? <Field label="Execution account"><select aria-label="Execution account" value={data.account} onChange={e => setData({ ...data, account: e.target.value })}><option value="">Select an account</option><option>Demo Futures · 8,420 USDT</option><option>Demo Spot · 1.24 BTC</option></select></Field> : null}</> : null}</>;
  } else if (step === 3) {
    next = () => { const amount = Number(data.amount); if (!amount || amount > 1) return setFormError(amount > 1 ? "Amount exceeds the available demo balance." : "Enter a trade amount."); setFormError(""); advance(); };
    nextLabel = "Save strategy";
    body = <><div className="form-grid"><Field label="Asset"><select aria-label="Asset" value={data.asset} onChange={e => setData({ ...data, asset: e.target.value })}><option>BTCUSDT</option><option>ETHUSDT</option><option>SOLUSDT</option></select></Field><Field label="Direction"><div className="segments">{["Long", "Short", "Both"].map(x => <button key={x} className={data.direction === x ? "selected" : ""} onClick={() => setData({ ...data, direction: x })}>{x}</button>)}</div></Field></div><div className="form-grid"><Field label="Trade amount" error={formError}><div><input aria-label="Trade amount" value={data.amount} onChange={e => { setData({ ...data, amount: e.target.value }); setFormError(""); }} /><b>BTC</b></div></Field><Field label="Execution"><select aria-label="Execution" value={data.execution} onChange={e => setData({ ...data, execution: e.target.value })}><option>Market</option><option>Limit</option><option>Next candle</option></select></Field></div><button className="edge-link" onClick={() => { setData({ ...data, amount: "2.5" }); setFormError("Amount exceeds the available demo balance."); }}>Preview insufficient-balance error</button></>;
  } else if (step === 4) {
    next = () => { const sl = Number(data.stopLoss); const daily = Number(data.dailyLoss); if (sl <= 0 || sl > 20 || daily <= 0) return setFormError("Risk limits must be positive; stop loss cannot exceed 20%."); setFormError(""); advance(); };
    nextLabel = "Validate controls";
    body = <><div className="intro-card risk"><ShieldCheck size={28} /><span><b>Hard stop rules</b><small>These controls run before every order.</small></span></div><div className="form-grid"><Field label="Stop loss" error={formError}><div><input aria-label="Stop loss" value={data.stopLoss} onChange={e => { setData({ ...data, stopLoss: e.target.value }); setFormError(""); }} /><b>%</b></div></Field><Field label="Take profit"><div><input aria-label="Take profit" value={data.takeProfit} onChange={e => setData({ ...data, takeProfit: e.target.value })} /><b>%</b></div></Field></div><Field label="Daily loss limit"><div><input aria-label="Daily loss limit" value={data.dailyLoss} onChange={e => { setData({ ...data, dailyLoss: e.target.value }); setFormError(""); }} /><b>USDT</b></div></Field><button className="edge-link" onClick={() => { setData({ ...data, stopLoss: "0", dailyLoss: "0" }); setFormError("Risk limits must be positive; stop loss cannot exceed 20%."); }}>Preview invalid-risk error</button></>;
  } else if (step === 5) {
    body = <><div className="review-list">{[["Bot", data.name], ["Signal", data.source], ["Broker", `${data.broker} · ${data.account}`], ["Strategy", `${data.direction} ${data.asset} · ${data.amount} BTC`], ["Risk", `SL ${data.stopLoss}% · ${data.dailyLoss} USDT/day`]].map(([label, value], index) => <div key={label}><CheckCircle size={19} weight="fill" /><span><small>{label}</small><b>{value}</b></span><button onClick={() => setStep(index === 0 ? 0 : index)}>Edit</button></div>)}</div><div className="state success"><CheckCircle size={21} weight="fill" /><span><b>All dependencies passed</b><small>A final revalidation will run during activation.</small></span></div></>;
  } else if (step === 6) {
    next = () => { if (activationFail) return setActivationError(true); setActivationError(false); advance(); };
    nextLabel = activationError ? "Retry activation" : "Activate bot";
    nextDisabled = !confirmed;
    body = <><div className="activation-card"><Power size={32} /><span><b>Ready to launch in Demo</b><small>{data.source} → {data.broker} · {data.asset}</small></span></div><label className="confirm"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} /><span><b>I reviewed the account, position size, and risk limits.</b><small>This acknowledgement should be audit logged by the backend.</small></span></label><label className="test-toggle"><input type="checkbox" checked={activationFail} onChange={e => setActivationFail(e.target.checked)} /> Simulate activation service failure</label>{activationError ? <div className="state error"><WarningCircle size={21} weight="fill" /><span><b>Activation failed</b><small>The complete setup is preserved for retry.</small></span></div> : null}</>;
  } else {
    body = <Monitor data={data} />;
  }

  return <Chrome active={step === 7}>
    <div className="workspace">
      <JourneyCanvas step={step} maxStep={maxStep} errors={errors} goTo={setStep} reset={reset} />
      <Drawer step={step} back={step > 0 ? () => setStep(step - 1) : null} next={next} nextLabel={nextLabel} nextDisabled={nextDisabled}>{body}</Drawer>
    </div>
  </Chrome>;
}
