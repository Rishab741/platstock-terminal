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
];

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "#121826",
        borderTop: "1px solid #1B2334",
        borderBottom: "1px solid #1B2334",
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #121826, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #121826, transparent)" }}
      />

      <div className="ticker-track flex items-center gap-0">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 whitespace-nowrap"
            style={{ borderRight: "1px solid rgba(27,35,52,0.7)" }}
          >
            <span
              className="text-[10px] font-bold tracking-widest"
              style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
            >
              {item.symbol}
            </span>
            <span
              className="text-[11px]"
              style={{ fontFamily: "var(--font-mono)", color: "#E8D3A0" }}
            >
              {item.price}
            </span>
            <span
              className="text-[10px]"
              style={{
                fontFamily: "var(--font-mono)",
                color: item.up ? "#10b981" : "#ef4444",
              }}
            >
              {item.delta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
