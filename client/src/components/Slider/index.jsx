import { Carousel } from 'react-bootstrap';

function Slider() 
{
    return (
        <Carousel fade controls={false} indicators={false}>
            {/* Item 01 */}
            <Carousel.Item>
                <img src="../../../public/slider1.jpg" style={{ height:'400px', borderRadius:"12px" }} className='d-block w-100' />
                <Carousel.Caption>
                    <h1 className='fw-bold'> EXAMPLE 01 </h1>
                    <h5> Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Nobis cumque eos exercitationem aspernatur totam repudiandae fugiat minima quidem, a, 
                    alias illo dignissimos explicabo illum delectus ullam soluta reiciendis officia distinctio? </h5>
                </Carousel.Caption>
            </Carousel.Item>

            {/* Item 02 */}
            <Carousel.Item>
                <img src="../../../public/slider2.jpg" style={{ height:'400px', borderRadius:"12px" }} className='d-block w-100' />
                <Carousel.Caption>
                    <h1> EXAMPLE 02 </h1>
                    <h5> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Asperiores sit molestias sapiente, dolore dolorem maiores aspernatur error neque minima! 
                    Fuga, numquam! Tempore neque minus, facere nisi dolorum nemo corporis magni? </h5>
                </Carousel.Caption>
            </Carousel.Item>

            {/* Item 03 */}
            <Carousel.Item>
                <img src="../../../public/slider3.jpg" style={{ height:'400px', borderRadius:"12px" }} className='d-block w-100' />
                <Carousel.Caption>
                    <h1> EXAMPLE 03 </h1>
                    <h5> Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Ratione numquam cum facere quod porro similique! Suscipit natus 
                    vero tempora eum dicta commodi earum, saepe molestias sed cupiditate ullam alias praesentium! </h5>
                </Carousel.Caption> 
            </Carousel.Item>                                                
        </Carousel>       
    );
}

export default Slider;