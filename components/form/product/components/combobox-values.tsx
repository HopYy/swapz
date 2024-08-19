import { categories, conditions, shipping_products } from '@/utils/settings';
import { ComboboxComponent } from '@/components/form/product/components/combobox';

interface ComboboxProps {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

export const CategoriesBox: React.FC<ComboboxProps> = ({
  value,
  disabled,
  onChange,
}) => {
  return (
    <ComboboxComponent
      placeholder="category"
      value={value}
      disabled={disabled}
      onChange={onChange}
      comboboxFormValues={categories.map((route) => ({
        label: route.label.toLowerCase(),
      }))}
    />
  );
};

export const ConditionsBox: React.FC<ComboboxProps> = ({
  value,
  disabled,
  onChange,
}) => {
  return (
    <ComboboxComponent
      placeholder="condition"
      value={value}
      disabled={disabled}
      onChange={onChange}
      comboboxFormValues={conditions.map((condition) => ({
        label: condition.label,
      }))}
    />
  );
};

export const ShippingBox: React.FC<ComboboxProps> = ({
  value,
  disabled,
  onChange,
}) => {
  return (
    <ComboboxComponent
      placeholder="shipping"
      value={value}
      disabled={disabled}
      onChange={onChange}
      comboboxFormValues={shipping_products.map(({ label }) => ({
        label: label,
      }))}
    />
  );
};
