import React, { useEffect, useState } from 'react';
import { a, useTrail, config } from '@react-spring/web';

const Header = () => {
  const lettersOfHeader = [
    'F',
    'e',
    't',
    'c',
    'h',
    'R',
    'e',
    'w',
    'a',
    'r',
    'd',
    's'
  ];

  const springs = useTrail(lettersOfHeader.length, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    to: { opacity: 1, transform: 'translateX(0%)' },
    config: config.gentle
  });

  return (
    <div className="header-container">
      {springs.map((props, i) => (
        <a.div style={props} key={i}>
          {lettersOfHeader[i]}
        </a.div>
      ))}
    </div>
  );
};

export default Header;
