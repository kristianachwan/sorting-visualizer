import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { Slider } from '@mui/material';
import Box from '@mui/material/Box';

function MyNavbar({ handleSubmit, animationSpeed, setAnimationSpeed }) {
  console.log(animationSpeed)
  return (
    <Navbar bg="light" expand="lg" className="p-3" >
      <Container>
        <Navbar.Brand href="#home">Sorting Visualizer</Navbar.Brand>
        <div className="slider-wrapper">
          <Box sx={{ width: 200 }}>
            <span className="lead">Speed: </span>
              <Slider
                aria-label="Small steps"
                defaultValue={65}
                step={10}
                marks
                min={5}
                max={85}
                onChange={e => setAnimationSpeed(100-e.target.value)}
                />            
          </Box>
        </div>
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