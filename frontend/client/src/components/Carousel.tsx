import { Carousel as AntdCarousel } from "antd";

interface CarouselProps {
  images: string[];
}
const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <AntdCarousel autoplay>
      {images.map((image) => (
        <img
          src={image}
          className="h-[70vh] w-full object-cover object-center"
        />
      ))}
    </AntdCarousel>
  );
};
export default Carousel;
