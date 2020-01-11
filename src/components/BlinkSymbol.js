import React from 'react';

export default function BlinkSymbol({ symbol, times = 3 }) {
  return (
    <span className="blink-symbol">
      {Array(times)
        .fill(symbol)
        .map((it, i) => (
          <span className={'dot-' + i} key={i}>
            {it}
          </span>
        ))}
    </span>
  );
}