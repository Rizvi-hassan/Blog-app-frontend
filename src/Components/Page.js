import React, { createElement } from 'react'
import Navbar from './Navbar'
// import image from '../images/blog-image.png'
// import image2 from '../images/big.png'
import { useNavigate } from 'react-router'

const Page = () => {
    const navigate = useNavigate();
    let key = 0;
    const data = {
        head: "10 Hilarious Cartoons That Depict Real-Life Problems of Programmers",
        title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A odit quis sint, repudiandae totam sapiente atque delectus maxime ex cupiditate? Quos saepe nihil porro voluptate suscipit dolore ex accusamus excepturi qui, autem omnis nisi non fuga dolorem ipsum ipsa soluta illo molestias velit perspiciatis maiores reiciendis recusandae. Ipsum, vitae iste.",
        elements: [
            ['h2', 'What is React Js'],
            ['p', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis voluptate repellendus tenetur ad non labore corporis molestiae quis nemo velit?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est a laborum temporibus voluptatibus ab labore inventore eum? Sunt error repellendus aspernatur iure vitae, voluptatum, exercitationem hic natus eveniet ratione quidem, nam ipsum voluptate saepe eius soluta! Cumque perspiciatis possimus minima quos placeat autem vitae provident vero ab similique, quis culpa ad consequuntur temporibus, nam illum deleniti. Tempore alias velit minus.'],
            ['img', 'https://i.ibb.co/Pz4VPLN/big.jpg'],
            ['h2', 'What is lorem'],
            ['p', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur impedit iste explicabo molestias architecto cumque iure deleniti velit voluptatum ipsa doloribus nesciunt reiciendis earum, voluptate excepturi unde voluptatem eum delectus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illo dolorum sit quis aliquam! Commodi, laborum. Laboriosam quidem similique dolor quos? Quibusdam veniam doloribus similique voluptatem explicabo distinctio iure ea.']]
    }
    const handleBack = () => {
        navigate('/');
    }
    return (
        <div>
            <Navbar />
                <i className="fa-solid fa-left-long back" onClick={handleBack}></i>
            <div className="container">
                <span className="tag">DESIGN TOOLS</span>
                <span className="date">August 13, 2023</span>
                <span className="author"> &#8213; Md Rizvi Hassan Ansari</span>
                <h1 className="main-heading">{data.head}</h1>

                <p className="paragraph">{data.title}</p>
                {data.elements.map((element) => {

                    if (element[0] === 'p') {
                        key++;
                        return createElement(element[0], { className: "paragraph", key: key }, element[1])
                    }
                    if (element[0] === 'h2') {
                        key++;
                        return createElement(element[0], { className: "sec-heading", key: key }, element[1])
                    }
                    if (element[0] === 'img') {
                        key++;
                        return createElement(element[0], { className: "img-blog", src: element[1], key: key })
                    }
                })}
                {/* <h1 className="main-heading">10 Hilarious Cartoons That Depict Real-Life Problems of Programmers</h1>

                <p className="paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. A odit quis sint, repudiandae totam sapiente atque delectus maxime ex cupiditate? Quos saepe nihil porro voluptate suscipit dolore ex accusamus excepturi qui, autem omnis nisi non fuga dolorem ipsum ipsa soluta illo molestias velit perspiciatis maiores reiciendis recusandae. Ipsum, vitae iste.</p>

                <h2 className="sec-heading">What is React Js</h2>

                <p className="paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis voluptate repellendus tenetur ad non labore corporis molestiae quis nemo velit?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est a laborum temporibus voluptatibus ab labore inventore eum? Sunt error repellendus aspernatur iure vitae, voluptatum, exercitationem hic natus eveniet ratione quidem, nam ipsum voluptate saepe eius soluta! Cumque perspiciatis possimus minima quos placeat autem vitae provident vero ab similique, quis culpa ad consequuntur temporibus, nam illum deleniti. Tempore alias velit minus.
                </p>
                <h2 className="sec-heading">What is Lorem</h2>
                <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur impedit iste explicabo molestias architecto cumque iure deleniti velit voluptatum ipsa doloribus nesciunt reiciendis earum, voluptate excepturi unde voluptatem eum delectus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illo dolorum sit quis aliquam! Commodi, laborum. Laboriosam quidem similique dolor quos? Quibusdam veniam doloribus similique voluptatem explicabo distinctio iure ea.</p>
                <img src={image} alt="error" className="img-blog"/> */}
            </div>
        </div>
    )
}

export default Page
