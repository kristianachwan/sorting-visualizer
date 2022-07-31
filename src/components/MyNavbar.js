import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { Slider } from '@mui/material';
import Box from '@mui/material/Box';

function MyNavbar({ handleSubmit, animationSpeed, setAnimationSpeed }) {
  console.log(animationSpeed)
  return (
    <Navbar bg="light" expand="lg" >
      <Container>
        <Navbar.Brand href="#home"><div className="lead">Sorting Visualizer</div>
        </Navbar.Brand>
        <div className="slider-wrapper">
          <Box sx={{ width: 200 }}>
            <span className="lead">Speed: </span>
              <Slider
                aria-label="Small steps"
                defaultValue={30}
                step={5}
                marks
                min={5}
                max={60}
                onChange={e => setAnimationSpeed(100-e.target.value)}
                />            
          </Box>
        </div>
        <Button onClick={handleSubmit}
          variant="outline-secondary" 
          className="btn-sm">
            Randomize new array
        </Button> 
      </Container> 
    </Navbar>
  );
}

export default MyNavbar;