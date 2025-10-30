import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Typing effect function
    const type = (n, t) => {
      const codes = document.getElementsByTagName("code");
      if (codes[n]) {
        const str = codes[n].innerHTML.toString();
        let i = 0;
        codes[n].innerHTML = "";

        setTimeout(() => {
          const se = setInterval(() => {
            i++;
            codes[n].innerHTML = str.slice(0, i) + "|";
            if (i === str.length) {
              clearInterval(se);
              codes[n].innerHTML = str;
            }
          }, 10);
        }, t);
      }
    };

    // Start typing effects
    type(0, 0);
    type(1, 600);
    type(2, 1300);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <p>HTTP: <span>404</span></p>
      <code><span>this_page</span>.<em>not_found</em> = true;</code>
      <code><span>if</span> (<b>you_spelt_it_wrong</b>) &#123;<span>try_again()</span>;&#125;</code>
      <code><span>else if (<b>we_screwed_up</b>)</span> &#123;<em>alert</em>(<i>"We're really sorry about that."</i>); <span>window</span>.<em>location</em> = home;&#125;</code>
      <center><a href="#" onClick={handleHomeClick} className="home-link">HOME</a></center>
    </div>
  );
}

export default NotFound;
