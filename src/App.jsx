import { useEffect, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { Bell } from "@phosphor-icons/react/Bell";
import { Broadcast } from "@phosphor-icons/react/Broadcast";
import { CalendarDots } from "@phosphor-icons/react/CalendarDots";
import { CaretRight } from "@phosphor-icons/react/CaretRight";
import { ChartLineUp } from "@phosphor-icons/react/ChartLineUp";
import { Check } from "@phosphor-icons/react/Check";
import { CheckCircle } from "@phosphor-icons/react/CheckCircle";
import { Copy } from "@phosphor-icons/react/Copy";
import { CurrencyBtc } from "@phosphor-icons/react/CurrencyBtc";
import { FunnelSimple } from "@phosphor-icons/react/FunnelSimple";
import { Gauge } from "@phosphor-icons/react/Gauge";
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
import { SlidersHorizontal } from "@phosphor-icons/react/SlidersHorizontal";
import { Target } from "@phosphor-icons/react/Target";
import { TrendUp } from "@phosphor-icons/react/TrendUp";
import { Users } from "@phosphor-icons/react/Users";
import { WarningCircle } from "@phosphor-icons/react/WarningCircle";

const phases = [
  { label: "Connections", note: "Signal + broker", icon: LinkSimple, range: [0, 5] },
  { label: "Trading setup", note: "Pair, size, leverage", icon: SlidersHorizontal, range: [6, 6] },
  { label: "Goals & risk", note: "Limits and strategies", icon: ShieldCheck, range: [7, 8] },
  { label: "Filters", note: "News and schedule", icon: FunnelSimple, range: [9, 9] },
  { label: "Review & activate", note: "Dry-run confirmation", icon: RocketLaunch, range: [10, 11] },
];

const exchanges = [
  ["Binance", "BN", "#f0b90b"], ["Bybit", "BY", "#24262b"], ["Kraken", "KR", "#5f43d6"],
  ["KuCoin", "KC", "#12a987"], ["Bitget", "BG", "#15a8c9"], ["BitMart", "BM", "#343434"],
];

function Button({ children, tone = "primary", icon: Icon, ...props }) {
  return <button className={`button button--${tone}`} {...props}>{Icon ? <Icon size={18} weight="bold" /> : null}<span>{children}</span></button>;
}

function Frame({ stage, children }) {
  return <div className="app-frame">
    <aside className="side-nav">
      <div className="wordmark"><span className="wordmark__mark" /><b>TraderFrame</b></div>
      <button className="create-bot"><Plus size={18} weight="bold" /> Create bot</button>
      <nav aria-label="Primary navigation">
        <span>Workspace</span>
        <button><House size={19} /> Home</button>
        <button><Users size={19} /> Copy trading</button>
        <button className="is-active"><Robot size={19} /> My bots <em>5</em></button>
        <button><ChartLineUp size={19} /> Analytics</button>
        <button><CalendarDots size={19} /> Calendar</button>
      </nav>
      <div className="nav-spacer" />
      <nav><button><Question size={19} /> Help center</button></nav>
      <div className="profile"><span>AS</span><div><b>Alex Smith</b><small>Demo workspace</small></div><CaretRight size={15} /></div>
    </aside>
    <header className="top-nav">
      <div className="search"><MagnifyingGlass size={17} /><input aria-label="Search" placeholder="Search TraderFrame" /></div>
      <div className="mode"><button>Live</button><button className="is-active">Demo</button></div>
      <button aria-label="Notifications"><Bell size={19} /></button><button aria-label="Theme"><Moon size={19} /></button>
      <Button>Upgrade</Button>
    </header>
    <div className="content-shell">
      {stage < 12 ? <div className="page-intro"><div><span className="eyebrow">NEW CRYPTO BOT</span><h1>Build your TradingView bot</h1><p>Connect the route, define the rules, then validate everything before activation.</p></div><div className="draft-pill"><span /> Draft saved</div></div> : null}
      {children}
    </div>
  </div>;
}

function PhaseRail({ stage }) {
  return <aside className="phase-rail"><div className="phase-progress"><span style={{ height: `${Math.min(100, Math.max(6, (stage / 11) * 100))}%` }} /></div>{phases.map((phase, index) => {
    const Icon = phase.icon; const current = stage >= phase.range[0] && stage <= phase.range[1]; const done = stage > phase.range[1];
    return <div className={`phase ${current ? "is-current" : ""} ${done ? "is-done" : ""}`} key={phase.label}><div className="phase__icon">{done ? <Check size={15} weight="bold" /> : <Icon size={18} />}</div><div><small>0{index + 1}</small><b>{phase.label}</b><span>{phase.note}</span></div></div>;
  })}</aside>;
}

function Summary({ stage }) {
  const signalReady = stage > 2; const brokerReady = stage > 5; const configured = stage > 9;
  return <aside className="summary-card">
    <header><div><span className="eyebrow">LIVE SUMMARY</span><h3>QPOTC</h3></div><span className="demo-badge">Demo</span></header>
    <div className="route-preview">
      <div className={signalReady ? "ready" : ""}><Broadcast size={20} /><span><small>Signal</small><b>{signalReady ? "TradingView" : "Not connected"}</b></span>{signalReady ? <CheckCircle size={17} weight="fill" /> : null}</div>
      <i /><div className={brokerReady ? "ready" : ""}><CurrencyBtc size={20} /><span><small>Broker</small><b>{brokerReady ? "Binance Futures" : "Not connected"}</b></span>{brokerReady ? <CheckCircle size={17} weight="fill" /> : null}</div>
    </div>
    <dl><div><dt>Market</dt><dd>{stage >= 6 ? "BTCUSDT" : "—"}</dd></div><div><dt>Order size</dt><dd>{stage >= 6 ? "0.01 BTC" : "—"}</dd></div><div><dt>Leverage</dt><dd>{stage >= 6 ? "15x Cross" : "—"}</dd></div><div><dt>Protection</dt><dd>{stage >= 7 ? "+50% / -50%" : "—"}</dd></div><div><dt>Filters</dt><dd>{configured ? "High impact" : "—"}</dd></div></dl>
    <div className="summary-note"><ShieldCheck size={19} /><span><b>Frontend prototype</b><small>No keys, alerts, or orders leave this browser.</small></span></div>
  </aside>;
}

function StepCard({ eyebrow, title, description, children, back, next, nextLabel = "Continue", nextDisabled = false, nextIcon = ArrowRight }) {
  return <section className="step-card"><header><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p></header><div className="step-card__body">{children}</div><footer>{back ? <Button tone="ghost" icon={ArrowLeft} onClick={back}>Back</Button> : <span />}<Button icon={nextIcon} onClick={next} disabled={nextDisabled}>{nextLabel}</Button></footer></section>;
}

function ProviderStep({ selected, onSelect, next }) {
  const options = [["TradingView", "Alert webhooks", Broadcast], ["Copy Trade", "Mirror a strategy", TrendUp], ["MetaTrader 5", "Expert advisor", Gauge]];
  return <StepCard eyebrow="CONNECTIONS · SIGNAL" title="Where should signals come from?" description="Choose the source that tells this bot when to open or close a position." next={next} nextDisabled={selected !== "TradingView"} nextLabel="Use TradingView"><div className="choice-list">{options.map(([name, note, Icon]) => <button key={name} className={`${selected === name ? "is-selected" : ""} ${name !== "TradingView" ? "is-muted" : ""}`} onClick={() => name === "TradingView" && onSelect(name)}><span className="choice-icon"><Icon size={25} weight="duotone" /></span><span><b>{name}</b><small>{note}</small></span>{name === "TradingView" ? <em>Recommended</em> : <em>Later</em>}{selected === name ? <CheckCircle size={22} weight="fill" /> : null}</button>)}</div></StepCard>;
}

function TradingViewStep({ back, next }) {
  const [copied, setCopied] = useState(""); const copy = (value) => { setCopied(value); window.setTimeout(() => setCopied(""), 1000); };
  return <StepCard eyebrow="CONNECTIONS · TRADINGVIEW" title="Add the TraderFrame webhook" description="Use these values in your TradingView alert. This MVP simulates the connection." back={back} next={next} nextLabel="I added the alert" nextIcon={LinkSimple}>
    <div className="connection-banner"><span className="tv-badge">TV</span><div><b>TradingView alerts</b><small>Webhook receiver · QPOTC</small></div><span>Not verified</span></div>
    <div className="instruction"><span>1</span><div><b>Paste the webhook URL</b><small>TradingView alert → Notifications → Webhook URL</small></div></div>
    <div className="copy-box"><label>Webhook URL</label><code>https://autobotsignal.io/v1/tradingview</code><button onClick={() => copy("url")}><Copy size={17} />{copied === "url" ? "Copied" : "Copy"}</button></div>
    <div className="instruction"><span>2</span><div><b>Paste the message payload</b><small>Keep the bot ID and TradingView variables unchanged.</small></div></div>
    <div className="code-box"><code>{`{\n  "bot_id": "QPOTC",\n  "action": "buy",\n  "symbol": "{{ticker}}",\n  "price": "{{close}}"\n}`}</code><button onClick={() => copy("json")}><Copy size={17} />{copied === "json" ? "Copied" : "Copy JSON"}</button></div>
  </StepCard>;
}

function VerifyStep({ kind, back, next }) {
  const [state, setState] = useState("idle"); const signal = kind === "signal";
  useEffect(() => { if (state !== "checking") return; const id = window.setTimeout(() => setState("ready"), 900); return () => window.clearTimeout(id); }, [state]);
  const checks = signal ? ["Webhook token", "Payload format", "Sample alert"] : ["API credentials", "Trading permission", "Futures access", "Account health"];
  return <StepCard eyebrow={`CONNECTIONS · ${signal ? "TRADINGVIEW" : "BINANCE"}`} title={state === "ready" ? "Connection verified" : `Verify ${signal ? "TradingView" : "Binance"}`} description={state === "ready" ? `${signal ? "TradingView alerts" : "Binance Futures"} are ready for this demo bot.` : "Run every required connection check before continuing."} back={state === "checking" ? undefined : back} next={state === "ready" ? next : () => setState("checking")} nextLabel={state === "idle" ? "Run connection check" : state === "checking" ? "Checking…" : "Continue"} nextDisabled={state === "checking"} nextIcon={state === "ready" ? ArrowRight : Lightning}>
    <div className={`verification-hero ${state}`}><div>{state === "ready" ? <CheckCircle size={38} weight="fill" /> : <Lightning size={34} weight="duotone" />}</div><span><b>{state === "idle" ? "Ready to test" : state === "checking" ? "Running secure checks" : "All checks passed"}</b><small>{state === "checking" ? "Please keep this page open." : "No live account action will be taken."}</small></span></div>
    <div className="check-stack">{checks.map((item, index) => { const passed = state === "ready" || (state === "checking" && index < 2); return <div key={item}><span className={passed ? "passed" : ""}>{passed ? <Check size={13} weight="bold" /> : index + 1}</span><b>{item}</b><small>{passed ? "Passed" : state === "checking" ? "Checking" : "Pending"}</small></div>; })}</div>
  </StepCard>;
}

function BrokerStep({ selected, onSelect, back, next }) {
  return <StepCard eyebrow="CONNECTIONS · BROKER" title="Choose a crypto broker" description="Select the exchange that will receive approved orders. Binance is used for this MVP." back={back} next={next} nextLabel="Connect Binance" nextDisabled={selected !== "Binance"} nextIcon={LinkSimple}>
    <div className="exchange-grid">{exchanges.map(([name, initials, color]) => <button key={name} onClick={() => name === "Binance" && onSelect(name)} className={`${selected === name ? "is-selected" : ""} ${name !== "Binance" ? "is-muted" : ""}`}><span style={{ color, borderColor: `${color}55`, background: `${color}12` }}>{initials}</span><b>{name}</b><small>{name === "Binance" ? "Futures supported" : "Available later"}</small>{selected === name ? <CheckCircle size={20} weight="fill" /> : null}</button>)}</div>
    <div className="safety-callout"><ShieldCheck size={22} /><span><b>Trading permission only</b><small>Withdrawal permission must stay disabled for every automated trading connection.</small></span></div>
  </StepCard>;
}

function CredentialsStep({ back, next }) {
  return <StepCard eyebrow="CONNECTIONS · BINANCE" title="Authorize the demo account" description="Enter restricted API credentials and confirm the allowed permissions." back={back} next={next} nextLabel="Verify connection" nextIcon={ShieldCheck}>
    <div className="connection-banner"><span className="binance-badge">BN</span><div><b>Binance Futures</b><small>Demo / Testnet · BTCUSDT</small></div><span>Trading only</span></div>
    <div className="form-grid"><label className="field"><span>API key</span><input aria-label="API key" defaultValue="TF-DEMO-BINANCE-01" /></label><label className="field"><span>API secret</span><input aria-label="API secret" type="password" defaultValue="prototype-secret" /></label></div>
    <div className="permission-list"><div><CheckCircle size={20} weight="fill" /><span><b>Read balances and positions</b><small>Required for margin and reconciliation.</small></span></div><div><CheckCircle size={20} weight="fill" /><span><b>Place and manage trades</b><small>Required for submit, cancel, and close.</small></span></div><div className="is-blocked"><LockKey size={20} weight="fill" /><span><b>Withdrawals disabled</b><small>This permission must never be enabled.</small></span></div></div>
  </StepCard>;
}

function Field({ label, suffix, children, ...props }) {
  return <label className="field"><span>{label}</span>{children || <div><input {...props} />{suffix ? <b>{suffix}</b> : null}</div>}</label>;
}

function TradingStep({ back, next }) {
  const [execution, setExecution] = useState("Market"); const [margin, setMargin] = useState("Cross"); const [leverage, setLeverage] = useState(15);
  return <StepCard eyebrow="TRADING SETUP" title="Define each trade" description="Set the market, execution method, position size, and closing controls." back={back} next={next}>
    <div className="section-title"><h3>Trade settings</h3><span>Required</span></div><div className="form-grid"><Field label="Bot name" defaultValue="QPOTC" /><Field label="Trading pair"><select aria-label="Trading pair" defaultValue="BTCUSDT"><option>BTCUSDT</option><option>ETHUSDT</option><option>SOLUSDT</option></select></Field></div>
    <label className="field"><span>Signal execution</span><div className="segmented">{["Market", "Limit", "Next minute"].map(x => <button key={x} className={execution === x ? "is-active" : ""} onClick={() => setExecution(x)}>{execution === x ? <Check size={13} /> : null}{x}</button>)}</div></label>
    <label className="field"><span>Margin mode</span><div className="segmented">{["Cross", "Isolated"].map(x => <button key={x} className={margin === x ? "is-active" : ""} onClick={() => setMargin(x)}>{margin === x ? <Check size={13} /> : null}{x}</button>)}</div></label>
    <label className="field"><span>Leverage <strong>{leverage}x</strong></span><input aria-label="Leverage" className="range" type="range" min="1" max="75" value={leverage} onChange={e => setLeverage(e.target.value)} /></label>
    <div className="form-grid"><Field label="Trading size" defaultValue="0.01" suffix="BTC" /><Field label="Order value" defaultValue="1,594.82" suffix="USDT" /></div>
    <div className="section-title"><h3>Closing management</h3></div><div className="form-grid"><Field label="Take profit" defaultValue="50" suffix="% ROI" /><Field label="Stop loss" defaultValue="-50" suffix="% ROI" /></div>
  </StepCard>;
}

function GoalsStep({ back, next }) {
  return <StepCard eyebrow="GOALS & RISK" title="Set bot-level goals" description="Stop new execution when profit or loss reaches the threshold." back={back} next={next}>
    <div className="goal-hero"><Target size={31} weight="duotone" /><span><b>Reconciled balance rules</b><small>Goals are checked against the latest confirmed account state.</small></span></div>
    <div className="limit-card"><div><span className="limit-icon gain"><TrendUp size={20} /></span><span><b>Profit goal</b><small>Stop after reaching</small></span></div><Field label="Amount" defaultValue="500" suffix="USDT" /></div>
    <div className="limit-card"><div><span className="limit-icon loss"><TrendUp size={20} /></span><span><b>Loss limit</b><small>Stop after losing</small></span></div><Field label="Amount" defaultValue="200" suffix="USDT" /></div>
  </StepCard>;
}

function RiskStep({ back, next }) {
  const [compound, setCompound] = useState(true); const [martingale, setMartingale] = useState(false);
  return <StepCard eyebrow="GOALS & RISK" title="Choose risk strategies" description="Apply progressive sizing only within the limits you reviewed." back={back} next={next}>
    <div className="strategy-row"><span className="strategy-icon"><Lightning size={22} /></span><span><b>Compound strategy</b><small>Use eligible profit on the next signal.</small></span><button aria-label="Toggle compound strategy" className={`switch ${compound ? "on" : ""}`} onClick={() => setCompound(!compound)}><i /></button></div>
    {compound ? <div className="form-grid nested"><Field label="Profit turnover" defaultValue="100" suffix="%" /><Field label="Compounding steps" defaultValue="2" suffix="steps" /></div> : null}
    <div className="strategy-row"><span className="strategy-icon"><TrendUp size={22} /></span><span><b>Martingale management</b><small>Increase size after a losing result.</small></span><button aria-label="Toggle martingale management" className={`switch ${martingale ? "on" : ""}`} onClick={() => setMartingale(!martingale)}><i /></button></div>
    {martingale ? <div className="form-grid nested"><Field label="Multiplier" defaultValue="2" suffix="x" /><Field label="Maximum steps" defaultValue="3" suffix="steps" /></div> : null}
    <div className="warning-callout"><WarningCircle size={21} /><span><b>Progressive sizing increases downside</b><small>The 200 USDT loss limit remains your bot-level circuit breaker.</small></span></div>
  </StepCard>;
}

function FiltersStep({ back, next }) {
  const [impact, setImpact] = useState("High");
  return <StepCard eyebrow="FILTERS" title="Choose when the bot can trade" description="Pause execution around market events and outside the approved schedule." back={back} next={next} nextLabel="Save and review">
    <div className="section-title"><h3>News filter</h3><span>ForexFactory calendar</span></div><label className="field"><span>Pause for impact level</span><div className="segmented">{["High", "Medium", "Low"].map(x => <button key={x} className={impact === x ? "is-active" : ""} onClick={() => setImpact(x)}>{impact === x ? <Check size={13} /> : null}{x}</button>)}</div></label>
    <div className="form-grid"><Field label="Pause before" defaultValue="5" suffix="min" /><Field label="Resume after" defaultValue="5" suffix="min" /></div>
    <div className="section-title"><h3>Trading schedule</h3></div><div className="form-grid triple"><Field label="Trading date" type="date" defaultValue="2026-09-08" /><Field label="Start time" type="time" defaultValue="00:00" /><Field label="End time" type="time" defaultValue="23:59" /></div>
    <div className="summary-note wide"><FunnelSimple size={20} /><span><b>Filtered signals stay visible</b><small>They appear in the journal but are never submitted to Binance.</small></span></div>
  </StepCard>;
}

function ReviewStep({ back, next }) {
  return <StepCard eyebrow="REVIEW & ACTIVATE" title="Review the execution route" description="Check the route, permissions, sizing, and protections before the final confirmation." back={back} next={next} nextLabel="Continue to activation" nextIcon={RocketLaunch}>
    <div className="review-route"><div><Broadcast size={25} /><span><small>Signal</small><b>TradingView</b></span></div><ArrowRight size={20} /><div><Robot size={25} /><span><small>Bot</small><b>QPOTC</b></span></div><ArrowRight size={20} /><div><CurrencyBtc size={25} /><span><small>Broker</small><b>Binance</b></span></div></div>
    <div className="review-grid"><div><small>Market & execution</small><b>BTCUSDT · Market</b><span>0.01 BTC · Cross · 15x</span></div><div><small>Position protection</small><b>TP +50% ROI</b><span>SL -50% ROI</span></div><div><small>Bot goals</small><b>+500 / -200 USDT</b><span>Compound · 2 steps</span></div><div><small>Trading filters</small><b>High impact news</b><span>00:00–23:59</span></div></div>
    <div className="dry-run"><CheckCircle size={24} weight="fill" /><span><b>Dry-run passed</b><small>The sample alert was validated. No real order was placed.</small></span></div>
  </StepCard>;
}

function ActivationStep({ back, next }) {
  const [confirmed, setConfirmed] = useState(false);
  return <StepCard eyebrow="FINAL CONFIRMATION" title="Activate QPOTC?" description="The bot will listen for TradingView alerts and route approved demo orders to Binance." back={back} next={next} nextLabel="Activate bot" nextIcon={RocketLaunch} nextDisabled={!confirmed}>
    <div className="activation-hero"><RocketLaunch size={36} weight="duotone" /><div><b>Ready for demo execution</b><small>TradingView → Binance Futures · BTCUSDT</small></div></div>
    <div className="activation-facts"><div><small>Environment</small><b>Demo / Testnet</b></div><div><small>Maximum order</small><b>0.01 BTC</b></div><div><small>Leverage</small><b>15x Cross</b></div></div>
    <label className="confirm-box"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} /><span><b>I reviewed the exchange account, size, leverage, and stop controls.</b><small>This confirmation is required before activation.</small></span></label>
  </StepCard>;
}

function ActiveDashboard({ edit }) {
  return <div className="active-page"><div className="active-header"><div><span className="active-pill">Active · Demo</span><h1>QPOTC Bot Overview</h1><p>TradingView → Binance Futures · BTCUSDT</p></div><div><Button tone="ghost" onClick={edit}>Edit as draft</Button><Button icon={Pause}>Pause bot</Button></div></div>
    <div className="metric-grid"><div><small>Realized P&amp;L</small><b className="positive">+$216.30</b><span>Last 7 days</span></div><div><small>Win rate</small><b>64%</b><span>8 wins · 1 loss</span></div><div><small>Open position</small><b>BTCUSDT</b><span>Long · 0.01 BTC</span></div><div><small>Connection</small><b className="positive">Healthy</b><span>Updated just now</span></div></div>
    <div className="dashboard-grid"><section className="position-panel"><header><div><CurrencyBtc size={24} /><span><b>BTCUSDT</b><small>Perpetual · Cross 15x</small></span></div><span className="active-pill">Open long</span></header><div className="position-stats"><span><small>Entry price</small><b>112,805.50</b></span><span><small>Mark price</small><b>113,124.22</b></span><span><small>Margin</small><b>106.32 USDT</b></span><span><small>Unrealized P&amp;L</small><b className="positive">+31.87 USDT</b></span></div><div className="price-band"><span><i className="tp" />TP 113,754.40</span><span><i className="mark" />Current 113,124.22</span><span><i className="sl" />SL 112,805.50</span></div><footer><Button tone="ghost">Edit TP/SL</Button><Button tone="danger">Close position</Button></footer></section>
    <section className="execution-panel"><header><h3>Latest execution</h3><span>2 sec ago</span></header>{[["Signal received", "TradingView alert #TV-4921"], ["Risk approved", "All rules passed"], ["Submitted", "Client order TF-8401"], ["Filled", "0.01 BTC @ 112,805.50"]].map(([name, note]) => <div className="execution-row" key={name}><span><Check size={12} weight="bold" /></span><div><b>{name}</b><small>{note}</small></div></div>)}</section></div>
    <section className="activity-table"><header><h3>Incoming signals &amp; orders</h3><button>View all activity <ArrowRight size={15} /></button></header><div className="table-row table-head"><span>Time</span><span>Signal</span><span>Order state</span><span>Size</span><span>Price</span><span>P&amp;L</span></div>{[["12:46:02", "Buy BTCUSDT", "Filled", "0.01 BTC", "112,805.50", "+31.87"], ["11:18:44", "Close BTCUSDT", "Filled", "0.01 BTC", "111,942.20", "+79.74"], ["09:04:11", "Buy BTCUSDT", "Filtered", "—", "—", "—"]].map(row => <div className="table-row" key={row[0]}>{row.map((cell, index) => <span className={index === 5 && cell.startsWith("+") ? "positive" : ""} key={index}>{cell}</span>)}</div>)}</section>
  </div>;
}

export function App() {
  const [stage, setStage] = useState(0); const [provider, setProvider] = useState(""); const [broker, setBroker] = useState("");
  const next = () => setStage(value => Math.min(12, value + 1)); const back = () => setStage(value => Math.max(0, value - 1));
  let content;
  if (stage === 0) content = <ProviderStep selected={provider} onSelect={setProvider} next={next} />;
  else if (stage === 1) content = <TradingViewStep back={back} next={next} />;
  else if (stage === 2) content = <VerifyStep kind="signal" back={back} next={next} />;
  else if (stage === 3) content = <BrokerStep selected={broker} onSelect={setBroker} back={back} next={next} />;
  else if (stage === 4) content = <CredentialsStep back={back} next={next} />;
  else if (stage === 5) content = <VerifyStep kind="broker" back={back} next={next} />;
  else if (stage === 6) content = <TradingStep back={back} next={next} />;
  else if (stage === 7) content = <GoalsStep back={back} next={next} />;
  else if (stage === 8) content = <RiskStep back={back} next={next} />;
  else if (stage === 9) content = <FiltersStep back={back} next={next} />;
  else if (stage === 10) content = <ReviewStep back={back} next={next} />;
  else if (stage === 11) content = <ActivationStep back={back} next={next} />;
  return <Frame stage={stage}>{stage === 12 ? <ActiveDashboard edit={() => setStage(6)} /> : <div className="setup-layout"><PhaseRail stage={stage} /><main>{content}</main><Summary stage={stage} /></div>}</Frame>;
}
