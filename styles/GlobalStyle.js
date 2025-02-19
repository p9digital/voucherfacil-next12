import { createGlobalStyle } from 'styled-components';
import devices from './devices';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;

    @media ${devices.tablet} {
      font-size: 9px;
    }
  }
  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;

    .buttonBack___1mlaL,.buttonFirst___2rhFr,.buttonLast___2yuh0,.buttonNext___2mOCa,.buttonNext___3Lm3s,.dot___3c3SI{cursor:pointer}.image___xtQGH{display:block;width:100%;height:100%}.spinner___27VUp{position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);width:30px;height:30px;animation-name:spin___S3UuE;animation-duration:1s;animation-timing-function:linear;animation-iteration-count:infinite;border:4px solid #a9a9a9;border-top-color:#000;border-radius:30px}@keyframes spin___S3UuE{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.container___2O72F{position:relative;overflow:hidden;height:100%;width:100%}.overlay___IV4qY{position:absolute;top:0;left:0;bottom:0;right:0;opacity:0;cursor:zoom-in;transition:opacity .3s,transform .3s}.hover___MYy31,.loading___1pvNI,.zoom___3kqYk{opacity:1}.imageLoadingSpinnerContainer___3UIPD{position:absolute;top:0;right:0;bottom:0;left:0;background-color:#f4f4f4}.slide___3-Nqo{position:relative;display:block;box-sizing:border-box;height:0;margin:0;list-style-type:none}.slide___3-Nqo:focus{outline:none!important}.slideHorizontal___1NzNV{float:left}.slideInner___2mfX9{position:absolute;top:0;left:0;width:100%;height:100%}.focusRing___1airF{position:absolute;top:5px;right:5px;bottom:5px;left:5px;pointer-events:none;outline-width:5px;outline-style:solid;outline-color:Highlight}@media (-webkit-min-device-pixel-ratio:0){.focusRing___1airF{outline-style:auto;outline-color:-webkit-focus-ring-color}}.horizontalSlider___281Ls{position:relative;overflow:hidden}.horizontalSliderTray___1L-0W{overflow:hidden;width:100%}.verticalSlider___34ZFD{position:relative;overflow:hidden}.verticalSliderTray___267D8{overflow:hidden}.verticalTray___12Key{float:left}.verticalSlideTrayWrap___2nO7o{overflow:hidden}.sliderTray___-vHFQ{display:block;list-style:none;padding:0;margin:0}.sliderAnimation___300FY{transition:transform .5s;transition-timing-function:cubic-bezier(.645,.045,.355,1);will-change:transform}.masterSpinnerContainer___1Z6hB{position:absolute;top:0;right:0;bottom:0;left:0;background-color:#f4f4f4}
    /*# sourceMappingURL=react-carousel.es.css.map */
  }
  *, *:before, *:after{
    box-sizing: inherit;
  }
  body{
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 1.6;
    color: ${(props) => props.theme.greyDarker};
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.black}
  }
  ol, ul {
    list-style: none;
  }
  input,
  select {
    font-size: 16px;
  }
  img{
    height: auto;
    max-width: 100%;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button{
    border: none;
    outline: none;
    line-height: inherit;
    cursor: pointer;
  }
  input, select{
    font-size: 16px;
  }
`;

export default GlobalStyle;
