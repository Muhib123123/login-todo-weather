import { Link } from "react-router";

type LinksPagesProps = {
  checkPage: string;
};

const LinksPages = ({ checkPage }: LinksPagesProps) => {
  if (checkPage === "posts") {
    return (
      <div className="header-shared-links-container">
        <div className="header-shared-links">
          <Link to="/weather">Weather</Link>
          <Link to="/todo">Todo</Link>
          <Link to="/todo2">Todo2</Link>
        </div>
        <p>
          Note: muhib@gmail.com access to Todo and muhib2@gmail.com access to
          Todo2
        </p>
      </div>
    );
  } else if (checkPage === "todo") {
    return (
      <div className="header-shared-links">
        <Link to="/weather">Weather</Link>
        <Link to="/posts">Posts</Link>
      </div>
    );
  } else if (checkPage === "todo2") {
    return (
      <div className="header-shared-links">
        <Link to="/weather">Weather</Link>
        <Link to="/posts">Posts</Link>
      </div>
    );
  } else if (checkPage === "weather") {
    return (
      <div className="header-shared-links-container">
        <div className="header-shared-links">
          <Link to="/posts">Posts</Link>
          <Link to="/todo">Todo</Link>
          <Link to="/todo2">Todo2</Link>
        </div>
        <p>
          Note: muhib@gmail.com access to Todo __ muhib2@gmail.com access to
          Todo2
        </p>
      </div>
    );
  }
};

export default LinksPages;
