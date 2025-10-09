import  Button from "react-bootstrap/Button";
import "./footer.css";

function MyFooter({author, email, linkGithub}) {
  return (
    <footer className="footer">
      <p>Author: {author}</p>
      <p>Created by: {email} </p>
      <p>&copy; {new Date().getFullYear()} LuuLDH. All rights reserved </p>
      <Button variant="link" target="_blank" href={linkGithub} >My Link Github's project: Movies Management </Button>
    </footer>
  )
}
export default MyFooter;

