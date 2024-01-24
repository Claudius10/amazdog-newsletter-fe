import styled from 'styled-components';

export const Button = styled.button<{ $width?: string, $color?: string }>`
    height: 1.5rem;
    width: ${props => props.$width || "fit-content"};
    padding: 0 0.3rem;
    border: 1px solid black;
    color: black;
    background-color: ${props => props.$color || "#f5cc45"};
    text-transform: uppercase;
    font: inherit;
    font-weight: 800;
    outline: inherit;
    cursor: pointer;
    letter-spacing: 0.5px;
    &:disabled {
    background-color: #cecece;
    `;