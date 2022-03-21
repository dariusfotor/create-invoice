import { useField } from 'formik';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  type: string;
  id: string;
  readOnly?: boolean;
  placeholder?: string;
  label?: string;
  onChange?: (e: any) => void;
}

const InputFormik = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      inputProps={{ readOnly: props.readOnly }}
      {...field}
      {...props}
      error={Boolean(meta.error && meta.touched)}
      helperText={meta.error && meta.touched ? meta.error : ''}
    />
  );
};

export default InputFormik;
