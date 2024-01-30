import styled from 'styled-components';

export const Button = styled.button<{ $margin?: string, $width?: string, $height?: string }>`
    color: #ffb12c;
    border: 2px solid #ffb12c;
    border-radius: 16px 16px 16px 16px;
    background-color: transparent;
    width: ${props => props.$width || "5rem"};
    height: ${props => props.$height || "2rem"};
    margin: ${props => props.$margin || "0rem"};
    font-weight: 600;
    cursor: pointer;
    font-family: 'Poppins', Helvetica, Arial, Lucida, sans-serif;
    `;