import { useField } from 'formik';
import styled from 'styled-components';
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
    <Container>
      <TextField
        style={{ width: '150px' }}
        inputProps={{ readOnly: props.readOnly }}
        {...field}
        {...props}
      />
      {meta.error && meta.touched && (
        <div style={{ color: 'red', fontSize: '15px', textAlign: 'center' }}>
          {meta.error}
        </div>
      )}
    </Container>
  );
};

export default InputFormik;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
