"use client";

const tickerItems = [
  { symbol: "AAPL", price: "192.34", delta: "+1.23%", up: true },
  { symbol: "NVDA", price: "875.12", delta: "+3.47%", up: true },
  { symbol: "MSFT", price: "421.80", delta: "-0.34%", up: false },
  { symbol: "TSLA", price: "248.50", delta: "+5.12%", up: true },
  { symbol: "GOOG", price: "178.90", delta: "+0.89%", up: true },
  { symbol: "AMZN", price: "198.40", delta: "-0.67%", up: false },
  { symbol: "META", price: "540.20", delta: "+2.11%", up: true },
  { symbol: "BRK.B", price: "404.70", delta: "+0.42%", up: true },
  { symbol: "JPM", price: "212.30", delta: "-0.18%", up: false },
  { symbol: "SPX", price: "5,320.4", delta: "+0.73%", up: true },
  { symbol: "VIX", price: "14.82", delta: "-2.34%", up: false },
  { symbol: "BTC", price: "67,420", delta: "+4.21%", up: true },
  { symbol: "SHARPE", price: "2.847", delta: "+0.12", up: true },
  { symbol: "ALPHA", price: "14.2%", delta: "+2.1%", up: true },
];

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] bg-black/40 py-3">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

      <div className="ticker-track flex items-center gap-0">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 border-r border-white/[0.04] whitespace-nowrap"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-white/60">
              {item.symbol}
            </span>
            <span className="text-[11px] font-mono text-white/80 font-tabular">
              {item.price}
            </span>
            <span
              className={`text-[10px] font-mono font-tabular ${
                item.up ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {item.delta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
