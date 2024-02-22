import React from 'react'
import PostAuthor from '../Components/PostAuthor'
import { Link } from 'react-router-dom';
import Thumbnail from "../images/blog22.jpg";

const PostDetail = () => {
  return (
    <section className="post-detail ">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor/>
          <div className="post-detail__button">
            <Link to={'/posts/werwer/edit'} className="btn sm primary ">Edit</Link>
            <Link to={'/posts/werwer/delete'} className="btn sm primary ">Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, sint a! Saepe 
          fugiat error voluptas exercitationem quibusdam distinctio molestias aperiam delectus dolore.
          Commodi veniam, facilis corrupti dignissimos pariatur voluptatum doloribus qui molestiae ipsum quibusdam optio sequi est 
          necessitatibus eius deserunt!
        </p>
        <p>
         Lorem ipsum dolor sit, amet consectetur adipisicing elit.
         Alias aliquid, optio error illo repellendus perspiciatis, debitis ipsam dolores fuga ducimus delectus, molestias 
         nam aut. Quae non neque sint voluptatem impedit doloribus nam ipsa incidunt sed debitis dolores ab, amet quis voluptates, nihil nobis fuga deleniti qui nulla eaque! Soluta, veniam aspernatur?
         Praesentium vero enim ea?
        </p>
       <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae est nulla
          voluptatem reprehenderit veritatis quidem maxime deserunt iure ad non dignissimos quod quaerat repellat voluptas sapiente,
          praesentium reiciendis alias sunt nisi maiores error repellendus exercitationem? Velit dolore vel debitis consequatur nihil eius eos. Officiis, commodi. 
          Facilis placeat dolorum fuga amet veritatis aut rerum atque dignissimos corrupti cumque, ullam itaque nostrum non quis enim ex. Dolore earum iusto temporibus fugit harum iste ullam accusantium facere. Sequi at facere laborum, corrupti dolorum error suscipit aspernatur eos sunt soluta tempore magnam, expedita fugit consectetur debitis voluptatibus. Rem numquam fugit quibusdam beatae quod unde rerum vel magnam accusantium explicabo eaque quia, 
          illum aliquam incidunt sint.
          </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Saepe magnam reiciendis
        nisi quasi cupiditate rem voluptate
        quaerat quo laborum error!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Amet, architecto reprehenderit nisi ratione similique ullam quas cum! Incidunt maxime, fugit aliquam at temporibus consequatur deserunt nostrum suscipit obcaecati beatae quod expedita provident rerum blanditiis recusandae vero tenetur ipsa officiis quae accusamus. Ipsum ratione sint iure. Repellendus a architecto mollitia incidunt exercitationem earum eligendi alias cupiditate! Rerum vel architecto omnis quas, nulla quibusdam! Suscipit aspernatur odit quo possimus harum veniam quidem beatae, ipsa ratione, iure excepturi amet enim optio ad eaque repellat placeat voluptatibus sequi? Quis, quod impedit a velit placeat laboriosam, provident ut dolorem aliquid sequi ad qui adipisci quibusdam voluptatem deleniti maiores voluptatum sit esse explicabo cupiditate accusamus. Nihil eum odio voluptatem facilis modi aperiam obcaecati, veritatis ratione assumenda ea provident ad fuga earum dolor quisquam corporis? Ipsum, tempore recusandae. Reprehenderit, quia mollitia aliquam quaerat dicta ad ducimus accusamus porro ratione consequatur, repudiandae, distinctio ullam. Amet repellendus aliquam quidem earum, tempora ducimus a delectus natus temporibus harum consequuntur at ipsum sunt eum totam culpa voluptas. Ipsum consectetur sit cupiditate quibusdam iusto dolorum id delectus tempora totam dicta quas veritatis, nihil amet porro nobis aliquam doloremque atque quidem iste labore beatae rem maiores magnam? Laboriosam, dolore? 
        Adipisci inventore sed placeat.
      </p>
      </div>
    </section>
  )
}

export default PostDetail