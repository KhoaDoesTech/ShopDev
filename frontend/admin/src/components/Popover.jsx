import React from 'react'
import { Button, Popover as AntdPopover, ConfigProvider } from 'antd';

function Popover(props) {
    const { placement, text, content, children } = props;
    return (
        <AntdPopover placement={placement} title={text} content={content}>
            {children}
        </AntdPopover>
    )
}

export default Popover