/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-30 12:11:05
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useState } from 'react';
import './style.less';

const icon = require('@/assets/icons/common/icon.svg');
const add = require('@/assets/icons/common/add.svg');

const MySvg = () => {
  // console.log(icon);
  // let src = icon;
  const [src, setSrc] = useState(icon);
  const handleClick = () => {
    console.log(add);
    setSrc(add);
  };
  return (
    <div>
      <button onClick={handleClick}>TEST</button>
      <img src={src} alt="" />
      {/*<svg className="icon">
          <use xlinkHref={add} />
        </svg>*/}
    </div>
  );
};

export default MySvg;
