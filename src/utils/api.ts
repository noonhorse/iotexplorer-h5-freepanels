/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-30 22:21:57
 * @LastEditors:
 * @LastEditTime:
 */
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
export const apiControlDeviceData = (data: any) => {
  sdk
    .controlDeviceData(data)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.error(err);
    });
};
