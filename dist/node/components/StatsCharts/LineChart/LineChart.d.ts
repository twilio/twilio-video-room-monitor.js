/// <reference types="react" />
import { chartDatum } from '../../../types';
export declare function formatBitrate(bytes: number, suffixIndex?: number): string;
interface LineChartProps {
    data: chartDatum[];
    title: string;
    yAxisLabel: string;
}
export default function LineChart({ data, title, yAxisLabel }: LineChartProps): JSX.Element;
export {};
