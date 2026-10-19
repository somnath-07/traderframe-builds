export const sections = ['Signal', 'Broker', 'Trading', 'Goals', 'Risk', 'Filters', 'Review'];
export const initialSetup = () => ({
  provider: 'TradingView', signalConnected: false, broker: 'Pepperstone', brokerConnected: false,
  account: '', name: 'Momentum Guard', symbol: 'EUR/USD', direction: 'Buy & sell', amount: '50',
  leverage: '10', orderType: 'Market', takeProfit: '100', targetMode: 'Fixed target', stopLoss: '50', dailyLoss: '200',
  maxPositions: '3', session: 'All sessions', spread: '2', newsFilter: true,
  reviewed: { trading: false, goals: false, risk: false, filters: false }, active: false,
});
export function isReady(data, index) {
  if (index === 0) return data.signalConnected;
  if (index === 1) return data.signalConnected && data.brokerConnected && Boolean(data.account);
  if (index < 6) return isReady(data, 1) && data.reviewed[sections[index].toLowerCase()];
  return [0, 1, 2, 3, 4, 5].every(i => isReady(data, i));
}
export function canOpen(data, index) {
  return index === 0 || (index === 1 ? isReady(data, 0) : index === 6 ? isReady(data, 6) : isReady(data, 1));
}
export function demoSetup() {
  return { ...initialSetup(), signalConnected: true, brokerConnected: true, account: 'Demo account · 10,000 USD',
    reviewed: { trading: true, goals: true, risk: true, filters: true } };
}
export function changeProvider(data, provider) {
  return { ...data, provider, signalConnected: false, brokerConnected: false, account: '', active: false,
    reviewed: { trading: false, goals: false, risk: false, filters: false } };
}
export function validateSection(data, index) {
  if (index === 2 && (!data.name.trim() || !data.symbol || !(Number(data.amount) > 0) || !(Number(data.leverage) >= 1 && Number(data.leverage) <= 100))) return 'Enter a strategy name, positive trade amount, and leverage between 1 and 100.';
  if (index === 3 && !(Number(data.takeProfit) > 0)) return 'Take profit must be greater than zero.';
  if (index === 4 && (!(Number(data.stopLoss) > 0) || !(Number(data.dailyLoss) > 0) || !(Number(data.maxPositions) > 0))) return 'Set positive stop loss, daily loss, and position limits.';
  if (index === 5 && !(Number(data.spread) > 0)) return 'Maximum spread must be greater than zero.';
  return '';
}
