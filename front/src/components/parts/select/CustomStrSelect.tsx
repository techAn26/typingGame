import { Dispatch, memo, SetStateAction } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

type CustomSelectStrType<T extends string> = {
  label: string
  value: T
  setValue: Dispatch<SetStateAction<T>>
  options: T[]
}

export const CustomSelectStr = memo(<T extends string>({ label, value, setValue, options }: CustomSelectStrType<T>) => {
  const handleChange = (event: SelectChangeEvent<T>) => {
    setValue(event.target.value as T)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select labelId={label} label={label} value={value} onChange={handleChange}>
          {options.map((o, i) => (
            <MenuItem value={o} key={i}>
              {o}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
})
