/*
 * @Author: wrq
 * @Date: 2021-10-03 08:55:55
 * @Description: 业务类方法封装
 */

/**
 * 获取当前环境的主题类型
 */
import { HashMap, ThemeType, TemplateData } from '../../global';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function getThemeType(): ThemeType {
  // webpack 环境变量
  const { theme_type } = _BUSINESS_ || {};
  // 非预制的主题类型，则使用默认 normal 主题
  return theme_type || 'normal';
}

/**
 * 格式化数据
 */
export function formatDeviceData(templateMap: TemplateData) {
  const data: HashMap = {};

  Object.keys(templateMap).forEach((key: string) => {
    const templateData: TemplateData = templateMap[key];
    const { define, id } = templateData;

    if (define.type === 'stringenum') {
      const { mapping } = define;

      const val = Object.keys(mapping).map((key: string) => ({
        name: key,
        desc: mapping[key] as string,
      }));
      data[id] = val;
    } else if (define.type === 'int') {
      data[id] = {
        min: +(define.min || 0),
        max: +(define.max || 0),
        start: +(define.start || 0),
        step: +(define.step || 0),
        unit: define.unit as string,
      };
    }
  });

  return data;
}

export function onControlDevice(id: string, value: any) {
  console.log(id, value);
  sdk.controlDeviceData({ [id]: value });
}
