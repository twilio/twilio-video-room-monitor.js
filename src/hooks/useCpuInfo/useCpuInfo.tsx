// import '@types/chrome';
import { useState, useEffect, useRef } from 'react';

let requestId = 100;
export default function useCpuInfo() {
  const [cpuInfo, setCpuInfo] = useState<{ timestamp: number; cpuInfo: chrome.system.cpu.CpuInfo } | null>(null);
  const prevResultRef = useRef<{ timestamp: number; cpuInfo: chrome.system.cpu.CpuInfo } | null>(null);

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      if (event.source !== window) {
        console.log('Ignoring message from unknown source');
        return;
      }
      if (event.data && event.data.cpuInfo) {
        // console.log('hook got event.data.cpuInfo: ', event.data && event.data.cpuInfo);
        setCpuInfo((prev) => {
          prevResultRef.current = prev;
          return { timestamp: Date.now(), cpuInfo: event.data && event.data.cpuInfo };
        });
      }
    };

    // Here we ask for cpuInfo at regular interval
    // to chrome extension's content script
    const intervalID = setInterval(() => {
      window.postMessage({ id: requestId++, command: 'getCPU' }, '*');
    }, 1000);

    // register to handle response for getCPU
    window.addEventListener('message', handleWindowMessage);
    return () => {
      window.removeEventListener('message', handleWindowMessage);
      clearInterval(intervalID);
    };
  });

  return { cpuInfo, prevCpuInfo: prevResultRef.current };
}

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

function getCpuTime(cpuInfo: chrome.system.cpu.CpuInfo) {
  const times = cpuInfo.processors.map((procInfo) => procInfo.usage.user);

  return sum(times);
}

export function getCpuPercent() {
  const { cpuInfo, prevCpuInfo } = useCpuInfo(); // eslint-disable-line

  if (!cpuInfo || !prevCpuInfo) return null;

  const currentCpuTime = getCpuTime(cpuInfo.cpuInfo);
  const prevCpuTime = getCpuTime(prevCpuInfo.cpuInfo);

  // console.log(currentCpuTime - prevCpuTime, cpuInfo.timestamp - prevCpuInfo.timestamp);
  return (currentCpuTime - prevCpuTime) / (cpuInfo.timestamp - prevCpuInfo.timestamp);
}
