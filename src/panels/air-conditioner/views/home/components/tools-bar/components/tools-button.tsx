import React, { useState } from 'react';
import classNames from 'classnames';
import './tools-button.less';
import { useHistory } from 'react-router-dom';
import { ToolsBarConfig } from '@src/panels/air-conditioner/views/home/components/tools-bar/ClassToolBar';
import { noop } from '@src/utils';
import IconTheme from '@src/components/custom/common/icon/icon-theme';

function ToolsButton({
  isActive,
  icon,
  width,
  height,
  size,
  name,
  label,
  path,
  callback = () => noop(),
  click = () => noop(),
}: ToolsBarConfig) {
  const history = useHistory();
  const [active, onToggle] = useState(isActive);
  const handleToggle = () => {
    // 更多跳转
    if (path === '/more') return history.replace(path);
    click(name, true);
    callback && callback();
    onToggle(!active);
  };
  return (
    <div className={classNames('button')} onClick={handleToggle}>
      {/* <img*/}
      {/*  alt=""*/}
      {/*  className={classNames(name)}*/}
      {/*  src={active ? iconActive : icon}*/}
      {/* />*/}

      <IconTheme kind={icon} size={size} />

      <div className={classNames('label')}>{label}</div>
    </div>
  );
}

export default ToolsButton;
