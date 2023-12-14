import { type FormInputSharedProps } from 'components/Tasks/components/FormFieldModel';
import { Field, type FieldProps } from 'formik';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const FormTextAreaField = ({ controlId, label, placeholder, name }: FormInputSharedProps) => {
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
                as="textarea"
                rows={3}
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
