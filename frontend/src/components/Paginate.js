import React from "react";
import './css/paginate.css'
/* REACT BOOTSTRAP */
import { Pagination } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ page, pages, keyword = "", isAdmin = false }) {
  /* isAdmin IS SET TO FALSE BY DEFAULT, ONLY IN ADMIN ProductList PAGE IS WILL BE SET TO TRUE */

  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  /* 
  console.log("KEYWORD", keyword);
  output: ?keyword=iPhone&page=1 => iPhone&page=1 => iPhone
  */

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? `/shop/?keyword=${keyword}&page=${x + 1}`
                : `/admin/productlist//?keyword=${keyword}&page=${x + 1}`
            }
          >
            <div className="pagination p1" >
             
            <ul active={x + 1 === page}>
          
            <a className="is-active" href="#"><li>{x + 1}</li></a>
         
            </ul>        
          </div>

          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}



export default Paginate;
