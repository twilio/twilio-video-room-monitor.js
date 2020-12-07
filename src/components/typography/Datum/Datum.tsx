import React from 'react';

type DatumProps = {
  label: string;
  value?: string;
};

export default function Datum({ label, value }: DatumProps) {
  return (
    <div>
      <span>
        {label}: {value}
      </span>
    </div>
  );
}
