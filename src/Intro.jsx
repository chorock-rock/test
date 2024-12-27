import { Suspense, cloneElement, useEffect, useState } from 'react';
import { Footer } from '@pmndrs/branding';
import styled, { keyframes } from 'styled-components';
import ThankyouImage from "/thankyou.png"
function Ready({ setReady }) {
  useEffect(() => () => void setReady(true), [])
  return null
}

const Button = styled.button`
  background: transparent;
  border: 2px solid white;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  padding: 30px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: white;
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;
const Input = styled.input`
  border: none;
  border-bottom: 2px solid white; /* 하얀색 밑줄 */
  background: transparent;
  color: white;
  font-size: 16px;
  padding: 8px 0;
  outline: none;
  width: 150px; /* 원하는 크기로 조정 가능 */
  text-align: center;
  z-index: 5;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6); /* 투명도 있는 placeholder */
  }

  &:focus {
    border-bottom: 2px solid #a1c4fd; /* 포커스 시 밑줄 색상 변경 */
  }
`;
const AnimatedText = styled.span`
  display: inline-block;
  animation: glow 3.5s infinite;
  padding: 12px;
  border-radius: 12px;
  font-weight: bold;
  z-index: 5;
`;

const Head = styled.div`
  width: 100%;
  height: 50px;
  animation: fadeIn 1.5s ease-in-out;
  left: 0px;
  top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const GradationWord = styled.div`
  line-height: 130%;
  background: linear-gradient(90deg, #cc7b32 34.84%, #FFFFFF 50.39%, #cc7b32 65.64%);
      -webkit-text-fill-color: transparent;
      background-clip: text;
`

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(true);
  const [ready, setReady] = useState(false);
  const [level, setLevel] = useState(0);
  const [isForget, setIsForget] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [animatedIndex, setAnimatedIndex] = useState(null);

  const targetWord = () => {
    return isForget ? '더 나아질 거야' : '보고 싶다'
  }
  useEffect(() => {
    if (animatedIndex !== null) {
      // "고마웠어"가 입력되면 3초 후 페이지 이동
      const timer = setTimeout(() => {
        setClicked(true);
        window.location.href = "#"; // 이동할 경로 설정
      }, 3000);
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
    }
  }, [animatedIndex]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // '고마웠어'라는 텍스트가 새로 입력되면 애니메이션 트리거
    if (value.includes(targetWord()) && animatedIndex !== value.length - 4) {
      setAnimatedIndex(value.length - 4); // 시작 인덱스 저장
    } else {
      setAnimatedIndex(null); // 초기화
    }
  };
  const renderAnimatedText = () => {
    const targetText = targetWord();
    const index = inputValue.indexOf(targetText);

    if (index === -1) return inputValue; // '고마웠어'가 없으면 그냥 반환

    // '고마웠어' 앞부분, 애니메이션 부분, 뒷부분 나누기
    const beforeText = inputValue.slice(0, index);
    const animatedPart = inputValue.slice(index, index + targetText.length);
    const afterText = inputValue.slice(index + targetText.length);

    console.log(index);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', }}>
        <span style={{ zIndex: 5 }}>{beforeText}</span>
        <AnimatedText animate={animatedIndex === index}>{animatedPart}</AnimatedText>
        <img className='fade-in' src={ThankyouImage} alt="My Image" style={{ width: "150px", position: 'absolute', top: -20, opacity: 0.8, zIndex: 1 }} />
        <span style={{ zIndex: 5 }}>{afterText}</span>
      </div>
    );
  };
  const clickForgetButton = () => {
    setIsForget(true);
    setLevel(1);
  };
  const clickCatchButton = () => {
    setIsForget(false);
    setLevel(1);
  }

  return (
    <>
      <Suspense fallback={<Ready setReady={setReady} />}>
        {cloneElement(children, { ready: clicked && ready })}
      </Suspense>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div className="stack" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, fontSize: 32 }}>
          {level === 0 && <Head><GradationWord>{(!ready ? '기다리는 중' : "누군가와 이별했나요?")}</GradationWord></Head>}
          {level === 1 && (<Head><GradationWord>여기에 "{targetWord()}" 라고 적어봐요</GradationWord></Head>)}
          {(ready && level === 0) && <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* <a href="#" onClick={() => setClicked(true)}> */}
            <Button style={{ fontSize: 18 }} onClick={() => clickForgetButton()}>
              그 사람을 잊고 싶어요.
            </Button>
            {/* </a> */}
            {/* <a href="#" onClick={() => setClicked(true)} > */}
            <Button style={{ fontSize: 18 }} onClick={() => clickCatchButton()}>
              그 사람을 잡고 싶어요.
            </Button>
            {/* </a> */}
          </div>
          }
          {level === 1 && <>
            <Input type="text" placeholder="..." value={inputValue}
              onChange={handleInputChange} />
            <div style={{ marginTop: "20px", fontSize: "18px" }}>{renderAnimatedText()}</div>

          </>}
        </div>
        <Footer
          date="12 /26"
          year="2024"
          link1={<a href="https://github.com/pmndrs/drei">pmndrs/drei</a>}
          link2={<a href="https://codesandbox.io/s/e6bjz">s/e6bjz</a>}
        />
      </div>
    </>
  )
}
