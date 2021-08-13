import React from 'react';
import { Primitive } from '../../../../types';
declare type DatumProps = {
    label: string;
    value: Primitive;
};
declare function Datum({ label, value }: DatumProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Datum>;
export default _default;
