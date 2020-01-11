import React, { useState } from 'react';

export default function Box({ onClickField, box, x, y }) {
  const [flag, setFlag] = useState(false);
  const classNames = ['box', box === '□' && 'hide', box === '*' && 'blow', flag && 'flag'].filter(
    it => it
  );

  return (
    <span
      className={classNames.join(' ')}
      onContextMenu={e => {
        e.preventDefault();
        setFlag(!flag);
      }}
      key={x}
      onClick={() => onClickField({ x, y })}
    >
      <span className="value">{flag ? 'f' : box}</span>
    </span>
  );
}
