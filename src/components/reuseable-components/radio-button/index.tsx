import { useField } from 'formik';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props {
  name: string;
  type: string;
  value: boolean | string;
  formcontrollabel: string;
}

const RadioButtonComp = (props: Props) => {
  const [field] = useField(props.name);
  return (
    <>
      <FormControlLabel
        control={<Radio {...props} {...field} />}
        label={props.formcontrollabel}
      />
    </>
  );
};

export default RadioButtonComp;
