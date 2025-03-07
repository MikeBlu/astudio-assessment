import React from 'react';

export function DownArrowIcon({width, height, className}: {width?: string, height?: string, className?: string}) {
    return (
    <svg className={className || ""} fill="#322625" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
        width={width || "800px"} height={height || "800px"} viewBox="0 0 96.154 90.154">
        <g>
            <path d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
                c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
                c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"/>
        </g>
    </svg>
    );
}

export function UpArrowIcon({width, height, className}: {width?: string, height?: string, className?: string}) {
    return (
    <svg className={className || ""} fill="#322625" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
        width={width || "800px"} height={height || "800px"} viewBox="0 0 96.154 90.154">
        <g transform='rotate(180 48.077 45.077)'>
            <path d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
                c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
                c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"/>
        </g>
    </svg>
    );
}