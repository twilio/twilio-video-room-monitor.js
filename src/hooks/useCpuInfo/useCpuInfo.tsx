// import '@types/chrome';
import { useState, useEffect } from 'react';

let requestId = 100;
export default function useCpuInfo() {
  const [cpuInfo, setCpuInfo] = useState<chrome.system.cpu.CpuInfo | null>(null);

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      if (event.source !== window) {
        console.log('Ignoring message from unknown source');
        return
      }
      console.log('hook got event.data.cpuInfo: ', event.data && event.data.cpuInfo);
      if (event.data && event.data.cpuInfo) {
        setCpuInfo(event.data && event.data.cpuInfo);
      }
    }

    // Here we ask for cpuInfo at regular interval
    // to chrome extension's content script
    const intervalID = setInterval(() => {
      window.postMessage({ id: requestId++, command: 'getCPU' }, "*");
    }, 5000);

    // register to handle response for getCPU
    window.addEventListener('message', handleWindowMessage)
    return () => {
      window.removeEventListener('message', handleWindowMessage);
      clearInterval(intervalID);
    };
  });

  return cpuInfo;
}
