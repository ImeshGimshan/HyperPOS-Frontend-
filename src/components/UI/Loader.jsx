
import styled from 'styled-components';

const Loader = ( ) => 
    {

    return (
        <StyledWrapper>
            <div className="loader">
                <div className="box">
                <div className="logo">
                    <img src="/HyperPOS - Logo.svg" alt="HyperPOS Logo" className="logo-image" />
                </div>
                </div>
                <div className="box" />
                <div className="box" />
                <div className="box" />
                <div className="box" />
            </div>
        </StyledWrapper>

    );

}

const StyledWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
z-index: 9999;

.loader {
--size: 320px;
--duration: 2.5s;
--logo-color: #a855f7;
--background: linear-gradient(
    0deg,
    rgba(168, 85, 247, 0.1) 0%,
    rgba(192, 132, 252, 0.15) 100%
);
--border-color: rgba(168, 85, 247, 0.5);
height: var(--size);
aspect-ratio: 1;
position: relative;
}

.loader .box {
position: absolute;
background: var(--background);
border-radius: 50%;
border-top: 2px solid var(--border-color);
box-shadow: rgba(168, 85, 247, 0.3) 0px 10px 30px -5px;
backdrop-filter: blur(8px);
animation: ripple var(--duration) infinite ease-in-out;
}

.loader .box:nth-child(1) {
inset: 30%;
z-index: 99;
background: rgba(168, 85, 247, 0.15);
border-width: 2px;
}

.loader .box:nth-child(2) {
inset: 22%;
z-index: 98;
border-color: rgba(168, 85, 247, 0.45);
border-width: 2px;
animation-delay: 0.24s;
}

.loader .box:nth-child(3) {
inset: 14%;
z-index: 97;
border-color: rgba(168, 85, 247, 0.4);
border-width: 2px;
animation-delay: 0.48s;
}

.loader .box:nth-child(4) {
inset: 6%;
z-index: 96;
border-color: rgba(168, 85, 247, 0.35);
border-width: 2px;
animation-delay: 0.72s;
}

.loader .box:nth-child(5) {
inset: 0%;
z-index: 95;
border-color: rgba(168, 85, 247, 0.3);
border-width: 2px;
animation-delay: 0.96s;
}

.loader .logo {
position: absolute;
inset: 0;
display: grid;
place-content: center;
padding: 15%;
}

.logo-image {
width: 100%;
height: auto;
filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8));
animation: pulse var(--duration) infinite ease-in-out;
}

@keyframes ripple {
0% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
}
50% {
    transform: scale(1.35);
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.6);
}
100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
}
}

@keyframes color-change {
0% {
    fill: var(--logo-color);
    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
}
50% {
    fill: #d8b4fe; /* Purple-300 for a lighter color at the midpoint */
    filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8));
}
100% {
    fill: var(--logo-color);
    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
}
}

@keyframes pulse {
    0% {
        opacity: 0.9;
        filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6));
        transform: scale(1);
    }
    50% {
        opacity: 1;
        filter: drop-shadow(0 0 30px rgba(168, 85, 247, 1));
        transform: scale(1.15); /* Slightly increased scale effect */
    }
    100% {
        opacity: 0.9;
        filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6));
        transform: scale(1);
    }
    }
}`;

export default Loader;