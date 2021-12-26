import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const thumbSize = "40px";
let leftPercent = 50;
export const RangeSlider = ({ min, max, onInput }) => {
  const [value, setValue] = useState("3");
  const selfRef = useRef(null);

  useEffect(() => {
    leftPercent = ((value - min) / (max - min)) * 100;
    selfRef.current.style.setProperty("--leftPercent", leftPercent);
  }, [value]);

  console.log(leftPercent);
  return (
    <StyledRangeSlider ref={selfRef}>
      <input
        type="range"
        className="defaultSlider"
        min={min}
        max={max}
        value={value}
        onInput={(e) => setValue(e.target.value) || onInput(e)}
      />
      <div className="customThumb"></div>
    </StyledRangeSlider>
  );
};

const StyledRangeSlider = styled.div`
  position: relative;
  height: 28px;
  margin: 30px 0;
  display: grid;
  place-items: center;

  .defaultSlider {
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    border-radius: 500px;
    background-image: linear-gradient(
      90deg,
      hsl(174, 77%, 80%) calc(var(--leftPercent) * 1%),
      hsl(224, 65%, 95%) calc(var(--leftPercent) * 1%)
    );
  }

  .defaultSlider:hover ~ .customThumb {
    opacity: 0.7;
  }

  .defaultSlider:active ~ .customThumb {
    background-color: var(--c-dark-cyan);
    opacity: 1;
    cursor: grabbing !important;
  }

  .defaultSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${thumbSize};
    height: ${thumbSize};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
  }

  .defaultSlider::-moz-range-thumb {
    width: ${thumbSize};
    height: ${thumbSize};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
  }

  .customThumb {
    height: ${thumbSize};
    width: ${thumbSize};
    position: absolute;
    z-index: 2;
    left: calc(var(--leftPercent) * 1%);
    transform: translateX(calc(var(--leftPercent) * -1%));
    border-radius: 50%;
    background-color: var(--c-strong-cyan);
    background-image: url(./images/icon-slider.svg);
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 calc(${thumbSize} / 2) calc(${thumbSize} / 3)
      var(--c-light-cyan);
    pointer-events: none;
  }
`;
