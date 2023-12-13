import { Field, type FieldProps } from 'formik';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const FormTextField = ({ controlId, label, placeholder, name }: FormTextFieldInputProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string>) => {
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

type FormTextFieldInputProps = { controlId: string; label: string; placeholder: string; name: string };
