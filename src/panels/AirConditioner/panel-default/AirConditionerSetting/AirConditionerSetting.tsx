
import React, { useMemo, useState } from 'react';
import { CheckBoxModal } from '@components/CheckBox';
import './AirConditionerSetting.less';

export function AirConditionerSetting({
    visible,
    onClose,
    controlDeviceData,
    identifier,
    identifierValue,
    templateMap,
}) {
    const { name, define } = templateMap[identifier];

    const enumOptions = useMemo(() => {
        return Object.keys(define.mapping).map(key => ({
            text: define.mapping[key],
            value: key,
        }));
    }, [templateMap[identifier]]);


    const onSubmit = async (value) => {
        await controlDeviceData(identifier, Number(value));
        onClose();
    };

    return (
        <div className='edit-action'>
            <CheckBoxModal
                visible={visible}
                options={enumOptions}
                value={String(identifierValue)}
                onChange={value => {
                    onSubmit(value);
                }}
                onClose={onClose}
                title={name}
                showBackBtn={false}
                confirmText={'保存'}
                cancelText={'取消'}
                cancelBtnType={'cancel'}
            />
        </div>
    );
}
