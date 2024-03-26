/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox as AntdCheckbox } from "antd";
import styled from "styled-components";

const CustomCheckbox = styled(AntdCheckbox)`
  & .ant-checkbox .ant-checkbox-inner {
    width: 25px;
    height: 25px;
  }

  & .ant-checkbox-disabled .ant-checkbox-inner {
    width: 25px;
    height: 25px;
    background-color: gray;
    border-color: gray;
  }

  & .ant-checkbox-checked .ant-checkbox-inner {
    width: 25px;
    height: 25px;
    background-color: #f97316;
    border-color: #f97316;
  }
`;
interface CheckboxProps {
  checked: boolean;
  onChange: any;
}
const Checkbox = (props: CheckboxProps) => {
  return <CustomCheckbox checked={props.checked} onChange={props.onChange} />;
};

export default Checkbox;
