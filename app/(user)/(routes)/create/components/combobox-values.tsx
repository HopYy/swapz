import { ComboboxComponent } from "./combobox" 

interface ComboboxProps {
    value: string
    disabled: boolean
    onChange: (value: string) => void;
};

const categories = [
    {
      label: "electronics",
    },
    {
      label: "fashion",
    },
    {
      label: "sports",
    },
    {
      label: "home & garden",
    },
    {
      label: "cars & motorbikes",
    },
    {
      label: "other",
    },
]

const conditions = [
    {
        label: "new"
    },
    {
        label: "used"
    },
    {
        label: "damaged"
    }
]

export const CategoriesBox: React.FC<ComboboxProps> = ({ value, disabled, onChange }) => {
    return (
        <ComboboxComponent
          placeholder="category"
          value={value}
          disabled={disabled}
          onChange={onChange}
          comboboxFormValues={categories}
        />
    )
  }
  
export const ConditionsBox: React.FC<ComboboxProps> = ({ value, disabled, onChange }) => {
    return (
      <ComboboxComponent
        placeholder="condition"
        value={value}
        disabled={disabled}
        onChange={onChange}
        comboboxFormValues={conditions}
      />
  )
}