import React from 'react';

export default ({ style, ...props }) => (
    <div
        style={{
            padding: 24,
            background: '#fff',
            minHeight: 360,
            ...style
        }}
        {...props}
    />
)