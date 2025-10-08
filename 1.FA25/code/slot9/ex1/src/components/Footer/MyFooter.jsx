import  Button from "react-bootstrap/Button";
import "./footer.css";

function MyFooter() {
  return (
    <footer className="footer">
      <p>Author: LuuLDH</p>
      <p>Created by: luuldhde180497@fpt.edu.vn </p>
      <p>&copy; {new Date().getFullYear()} LuuLDH. All rights reserved </p>
      <Button variant="link" href="https://github.com/HoangLuu217/FER201" >My Link Github's project: Movies Management </Button>
    </footer>
  )
}
export default MyFooter;
