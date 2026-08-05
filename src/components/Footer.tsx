// Footer.tsx

import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-3">
      <Container className="text-center">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} FakeStore App. Built with React,
          TypeScript, React-Bootstrap, & Redux.
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
