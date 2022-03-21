import { useField } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  label: string;
  data: { label: string; value: any }[];
}

const SelectField = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <TextField
        style={{ width: '150px' }}
        label={props.label}
        select
        {...field}
      >
        {props.data.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {meta.error && meta.touched && (
        <div
          style={{
            position: 'absolute',
            color: 'red',
            fontSize: '15px',
            textAlign: 'center',
          }}
        >
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default SelectField;
