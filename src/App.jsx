import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, } from '@react-three/fiber'
import { useGLTF, PositionalAudio, Text } from '@react-three/drei'
import MyImage from "/logo_3.svg"
import PauseIcon from '@mui/icons-material/Pause';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function App({ ready }) {
  const [musicFlag, setMusicFlag] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {
    window.open('https://www.youtube.com', '_blank'); // 새 탭에서 유튜브 열기
  };

  useEffect(() => {
    console.log(audioRef.current)
    if (audioRef.current) {
      if (musicFlag) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicFlag]);
  return (
    <>
      <Canvas camera={{ position: [0, 2, 20], fov: 40 }}>
        <fog attach="fog" args={['#cc7b32', 0, 500]} />
        <Model ready={ready} />
      </Canvas>
      <audio ref={audioRef} src="/beyondiBreakup.mp3" />
      <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifycontents: 'center', flexDirection: 'column', }}>
          <img src={MyImage} alt="My Image" style={{ width: "180px" }} />
          <div style={{ fontSize: '2rem', marginTop: 18 }}>
            이별노트
          </div>
          <div style={{ fontSize: '1rem', marginTop: 0 }}>
            오늘이 지나면 괜찮아질 당신
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', right: -5, width: 50, height: 50, top: '24%' }}>
        <ul className="music" onClick={() => { setMusicFlag(!musicFlag) }}>
          {!musicFlag && <li><MusicNoteIcon /></li>}
          {musicFlag && <li><PauseIcon /></li>}
        </ul>
      </div>
      <div>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: '#FF0000',
            position: 'absolute',
            bottom: '1px',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        >
          YouTube
        </button>
      </div>
    </>
  )
}

/*
auto-generated by: https://github.com/react-spring/gltfjsx
author: jemepousse (https://sketchfab.com/jemepousse)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/356c773c4b9a45d8b9d4aa04c60ecb27
title: Red City
*/
function Model({ ready }) {
  const color = '#f89E56'
  const group = useRef();
  const [rotationDirection, setRotationDirection] = useState(1); // 1: 왼쪽, -1: 오른쪽
  const { nodes, materials } = useGLTF('/scene-draco.glb');
  const materials2 = useGLTF('/scene_2.glb');

  console.log(materials2);
  // materials2.color.set("blue");

  materials.Scene_Root.opacity = 0.3;
  const [mashColor, setMashColor] = useState(materials.Scene_Root);

  const forgetWishString = ["고마웠어", "그동안 고생했어", "너는 소중한 사람", "시간이 지나면 편해질 거야", '이제 괜찮아'];
  const catchWishString = ["보고싶어"];

  let FareWellString = forgetWishString;
  // console.log(mashColor)
  useFrame(() => {
    if (group.current) {
      // 회전 업데이트
      group.current.rotation.y += 0.001 * rotationDirection;

      // 방향 전환 조건: 특정 각도에서 방향 변경
      if (group.current.rotation.y > Math.PI / 4) {
        setRotationDirection(-1); // 오른쪽으로 변경
      } else if (group.current.rotation.y < -Math.PI / 4) {
        setRotationDirection(1); // 왼쪽으로 변경
      }
    }
  });
  return (
    <group ref={group} scale={0.001} position={[0, 0, -100]} dispose={null}>
      <group rotation={[-Math.PI / 1.98, 0, 0]}>
        <group position={[-102253.52, -210688.86, -17050.52]}>
          <mesh material={materials2.materials.mat0} geometry={nodes.mesh_0.geometry} color='black' />
          {/* <mesh material={materials.Scene_Root} geometry={nodes.mesh_1.geometry} /> */}
          {/* <mesh material={materials.Scene_Root} geometry={nodes.mesh_2.geometry} /> */}
          <mesh material={materials2.materials.mat0} geometry={nodes.mesh_3.geometry} color='black' />
        </group>

        {/* 중앙 글씨 */}
        <Text
          position={[0, 30, 0]} // 위쪽으로 위치 조정
          fontSize={7000} // 텍스트 크기
          color={color} // 글씨 색깔
          anchorX="center" // 가로 정렬
          anchorY="middle" // 세로 정렬
          font="/fonts/Tenada.ttf"
          rotation={[Math.PI / 2, 0, 0]} // X축으로 45도 회전
        >
          {FareWellString[0]}
        </Text>
        {/* 중앙 글씨 */}
        <Text
          position={[80000, 80000, 8000]} // 우측 위로 감
          fontSize={5000} // 텍스트 크기
          color={color}  // 글씨 색깔
          anchorX="right" // 가로 정렬
          anchorY="middle" // 세로 정렬
          font="/fonts/Tenada.ttf"
          rotation={[Math.PI / 2, 0, 0]} // X축으로 45도 회전
        >
          {FareWellString[1]}
        </Text>
        <Text
          position={[-30000, 0, 20000]} // 우측 위로 감
          fontSize={3000} // 텍스트 크기
          color={color}  // 글씨 색깔
          anchorX="right" // 가로 정렬
          anchorY="middle" // 세로 정렬
          font="/fonts/Tenada.ttf"
          rotation={[Math.PI / 2, 0, 0]} // X축으로 45도 회전
        >
          {FareWellString[2]}
        </Text>
        <Text
          position={[-20000, 150, 10000]} // 우측 위로 감
          fontSize={3000} // 텍스트 크기
          color={color}  // 글씨 색깔
          anchorX="right" // 가로 정렬
          anchorY="middle" // 세로 정렬
          font="/fonts/Tenada.ttf"
          rotation={[Math.PI / 2, 0, 0]} // X축으로 45도 회전
        >
          {FareWellString[3]}
        </Text>
        <Text
          position={[20000, 1500, 20000]} // 우측 위로 감
          fontSize={3000} // 텍스트 크기
          color={color}  // 글씨 색깔
          anchorX="right" // 가로 정렬
          anchorY="middle" // 세로 정렬
          font="/fonts/Tenada.ttf"
          rotation={[Math.PI / 2, 0, 0]} // X축으로 45도 회전
        >
          {FareWellString[4]}
        </Text>

        {/* 태양 */}
        <mesh position={[250000, 200000, 50000]}>
          <sphereGeometry args={[30000, 32, 32]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  )
}
