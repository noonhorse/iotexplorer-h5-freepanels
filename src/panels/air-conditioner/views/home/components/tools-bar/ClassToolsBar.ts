/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-21 15:31:55
 * @LastEditors:
 * @LastEditTime:
 */
import { ToolsBarConfig } from '@src/panels/air-conditioner/views/home/components/tools-bar/ClassToolBar';

export default class ClassToolsBar {
  static TOOLS_BAR_CONFIG: Array<ToolsBarConfig> = [
    {
      isActive: true,
      name: 'mode',
      label: '工作模式',
      icon: 'work_mode',
      size: 84,
      path: '/',
    },
    {
      isActive: false,
      name: 'gear',
      label: '风速',
      icon: 'gear',
      size: 78,
      path: '/',
    },
    {
      isActive: false,
      name: 'more',
      label: '设置',
      icon: 'more',
      size: 74,
      path: '/more',
    },
  ];
}
