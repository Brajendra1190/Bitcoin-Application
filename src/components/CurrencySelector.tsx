import React from 'react';
import Select from 'react-select';

interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
  currencies: string[];
}

export function CurrencySelector({ currency, onCurrencyChange, currencies }: CurrencySelectorProps) {
  const options = currencies.map(code => ({
    value: code.toUpperCase(),
    label: code.toUpperCase(),
  }));

  return (
    <Select
      value={{ value: currency, label: currency }}
      onChange={(option) => option && onCurrencyChange(option.value)}
      options={options}
      className="text-gray-900"
      classNamePrefix="select"
    />
  );
}