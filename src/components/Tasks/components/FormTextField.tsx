import { Field, type FieldProps } from 'formik';
import { type FC } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
type CustomInputProps = { controlId: string; label: string; placeholder: string; name: string };
export const FormTextField: FC<CustomInputProps> = ({ controlId, label, placeholder, name }) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      }: FieldProps) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;

        return (
          <Form.Group className="mb-3" controlId={controlId} as={Row}>
            <Form.Label column sm={4}>
              {label}
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                {...field}
                type="text"
                placeholder={placeholder}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
              />
              <Form.Control.Feedback type="invalid">{form.errors[field.name] as string}</Form.Control.Feedback>
            </Col>
          </Form.Group>
        );
      }}
    </Field>
  );
};
