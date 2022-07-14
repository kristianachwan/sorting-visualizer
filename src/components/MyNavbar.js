import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
function MyNavbar({ handleSubmit }) {
  return (
    <Navbar bg="light" expand="lg" className="p-3" >
      <Container>
        <Navbar.Brand href="#home">Sorting Visualizer</Navbar.Brand>
          <Button onClick={handleSubmit}
            variant="outline-secondary" 
            className="btn-lg">
              Randomize new array
          </Button>
      </Container> 
    </Navbar>
  );
}

export default MyNavbar;