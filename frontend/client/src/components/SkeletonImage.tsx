import { Skeleton as AntdSkeleton } from "antd";
import React from "react";
import styled from "styled-components";
const Skeleton = styled(AntdSkeleton.Image)`
  & .ant-skeleton-image {
    width: 100% !important;
    min-height: 200px;
  }
`;
function SkeletonImage() {
  return <Skeleton active className="flex-grow" />;
}

export default SkeletonImage;
