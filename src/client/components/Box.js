import React from 'react';

export default function Box({ onClickField, s, x, y }) {
  const classNames = ['box', s === '□' && 'hide', s === '*' && 'blow'];

  return (
    <span className={classNames.join(' ')} key={x} onClick={() => onClickField({ x, y })}>
      <span className="value">{s}</span>
    </span>
  );
}
