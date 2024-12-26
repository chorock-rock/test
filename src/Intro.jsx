import { Suspense, cloneElement, useEffect, useState } from 'react';
import { Footer } from '@pmndrs/branding';
import styled from 'styled-components';

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

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false)
  const [ready, setReady] = useState(false)
  const [level, setLevel] = useState(0);
  return (
    <>
      <Suspense fallback={<Ready setReady={setReady} />}>
        {cloneElement(children, { ready: clicked && ready })}
      </Suspense>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div className="stack" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, fontSize: 32 }}>
          {level === 0 && (!ready ? '기다리는 중' : "누군가를 그리워하고 있나요?")}
          {ready && <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: 18 }}><a href="#" onClick={() => setClicked(true)}>
            <Button style={{ fontSize: 18 }}>
              그 사람을 잊고 싶어요.
            </Button>
          </a>
            <a href="#" onClick={() => setClicked(true)}>
              <Button style={{ fontSize: 18 }}>
                그 사람을 잡고 싶어요.
              </Button>
            </a></div>
          }

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
