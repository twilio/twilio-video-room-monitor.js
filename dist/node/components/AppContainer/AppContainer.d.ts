import React from 'react';
export default function AppContainer({ children }: {
    children: (activeTab: 'info' | 'stats') => React.ReactNode;
}): JSX.Element;
