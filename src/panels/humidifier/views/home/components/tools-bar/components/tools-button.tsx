import React, { useState } from 'react';
import classNames from 'classnames';
import './tools-button.less';
import { useHistory } from 'react-router-dom';
import { ToolsBarConfig } from '@src/panels/humidifier/views/home/components/tools-bar/ClassToolBar';
import { noop } from '@/utils';
import IconTheme from '@src/components/custom/common/icon/icon-theme';

function ToolsButton({
  isActive,
  icon,
  size,
  name,
  label,
  path,
  callback = () => noop(),
  click = () => noop(),
  isFillNone = false,
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
      <IconTheme kind={icon} size={size} isFillNone={isFillNone} />
      <div className={classNames('label')}>{label}</div>
    </div>
  );
}

export default ToolsButton;
