import { css } from '@emotion/react'
import { SelectChangeEvent } from '@mui/material'
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'

type Option = {
  id: string
  name: string
}

type Props = {
  label: string
  value: Option
  setValue: (value: Option) => void
  options: Option[]
}

export const CustomSelectObj = ({ label, value, setValue, options }: Props) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = options.find((option) => option.id === event.target.value)
    if (selectedOption) {
      setValue(selectedOption)
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        value={value.id || ''}
        label={label}
        onChange={handleChange}
        css={styles.select}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const styles = {
  select: css`
    min-width: 120px;
  `,
}
