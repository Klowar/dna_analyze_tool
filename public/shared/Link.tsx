import PropTypes from 'prop-types';
import React from 'react';
import { ipcRenderer } from '.';


export type LinkProps = {
    to: string;
    children: any; // eslint-disable-line
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
    const onClick = (): void => {
        ipcRenderer.send("route", to);
    }
    return <a onClick={onClick} href="#">{children}</a>
}

Link.propTypes = {
    to: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

