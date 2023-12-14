import { type FormInputSharedProps } from 'components/Tasks/components/FormFieldModel';
import { Field, type FieldProps } from 'formik';
import { type ReactNode } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const FormSelectField = ({ controlId, label, placeholder, name, children }: FormSelectFieldInputProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<number>) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          const value = parseInt(event.target.value, 10);
          void form.setFieldValue(field.name, value);
        };

        return (
          <Form.Group className="mb-3" controlId={controlId} as={Row}>
            <Form.Label column sm={4}>
              {label}
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                {...field}
                onChange={handleChange}
                aria-label={placeholder}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}>
                {children}
              </Form.Select>
            </Col>
          </Form.Group>
        );
      }}
    </Field>
  );
};

type FormSelectFieldInputProps = FormInputSharedProps & { children: ReactNode };
