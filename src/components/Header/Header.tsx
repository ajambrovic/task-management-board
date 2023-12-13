import { selectCurrentTaskSearchQuery } from 'domain/tasks/tasksSelector';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';

export const Header = () => {
  const dispatch = useDispatch();
  const searchQuery = useAppSelector(selectCurrentTaskSearchQuery);

  const debounceSearching = useCallback(
    debounce((searchItem: string) => {
      dispatch(tasksActions.loadTasks(searchItem));
    }, 500),
    [],
  );

  return (
    <Container fluid>
      <Row className="p-3">
        <Col xs="auto">
          <Form.Label htmlFor="inlineSearchInput" visuallyHidden>
            Search
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineSearchInput"
            placeholder="Enter search input"
            onKeyUp={handleKeyDown}
            defaultValue={searchQuery}
          />
        </Col>
      </Row>
    </Container>
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const inputValue = (document.getElementById('inlineSearchInput') as HTMLInputElement).value;
    debounceSearching(inputValue);
  }
};
