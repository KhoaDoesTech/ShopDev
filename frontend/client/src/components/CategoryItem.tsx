import { CategoryProps } from "../interfaces";
import styled from "styled-components";

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px; /* You can adjust this height as needed */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ImageHover = styled.div<{ $color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  .gradient-box {
    /* Styles for gradient box */
    /* Example: background: linear-gradient(...); */
  }
`;
const GradientBox = styled.div<{ $color?: string }>`
  position: absolute;
  bottom: -100px;
  left: 0;
  opacity: 0;
  width: 100%;
  transition: bottom 0.4s ease;
  padding: 1rem;
  background: ${({ $color }) => `${$color}`};
`;
const HoverEffect = styled.div`
  position: relative;
  border-radius: 0.2rem;
  overflow: hidden;
  &:hover {
    ${ImageHover} {
      opacity: 1;
    }
  }
`;
function CategoryItem(props: CategoryProps) {
  const { initialImage, imageOnHover, label, color } = props;
  return (
    <HoverEffect className="hovereffect flex-grow">
      <ImageWrapper className="image-wrapper">
        <img
          src={initialImage}
          className="image object-cover w-full h-[300px]"
          alt="normal"
        />
        <ImageHover className="image-hover object-cover w-full">
          <GradientBox $color={color} className="gradient-box">
            <p className="text-3xl font-black text-white">{label}</p>
          </GradientBox>
          <img
            src={imageOnHover}
            className="object-cover w-full h-[300px] z-[5]"
            alt="hover"
          />
        </ImageHover>
      </ImageWrapper>
    </HoverEffect>
  );
}

export default CategoryItem;
