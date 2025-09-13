import React from 'react';
import { Picker } from '@react-native-picker/picker';

export interface CategoryPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  categories: { label: string; value: string }[];
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedValue,
  onValueChange,
  categories,
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={{ marginHorizontal: 10, marginBottom: 10 }}
    >
      {categories.map(cat => (
        <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
      ))}
    </Picker>
  );
};
