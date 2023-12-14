import { type FormInputSharedProps } from 'components/Tasks/components/FormFieldModel';
import { Field, type FieldProps } from 'formik';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const FormTextField = ({
  controlId,
  label,
  placeholder,
  name,
  type = 'text',
  transform,
}: FormTextFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string | number>) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        let value = field.value;

        if (transform && field.value !== 0) {
          value = transform(field.value);
        }

        return (
          <Form.Group className="mb-3" controlId={controlId} as={Row}>
            <Form.Label column sm={4}>
              {label}
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                {...field}
                type={type}
                placeholder={placeholder}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                value={value}
              />
              <Form.Control.Feedback type="invalid">{form.errors[field.name] as string}</Form.Control.Feedback>
            </Col>
          </Form.Group>
        );
      }}
    </Field>
  );
};

type FormTextFieldProps = FormInputSharedProps & { type?: string; transform?: (value: any) => any };
