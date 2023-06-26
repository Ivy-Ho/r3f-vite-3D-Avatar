import { ContactShadows, Environment, OrbitControls, Sky } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from "leva";
import typingMusic from '../music/night-coffee-shop-114856.mp3'
import salsaMusic from '../music/tropical-summer-latin-pop-112664.mp3'
import hiphopMusic from '../music/cool-chill-hip-hop-ambience-music-95-bpm-121533.mp3'
import sillyMusic from '../music/cheating-15095.mp3'
import { useEffect } from "react";

export const Experience = () => {

  const { animation, bgm } = useControls({
    animation: {
      value: "Typing",
      options: ["Typing", "Salsa Dancing","Hiphop Dancing", "Silly Dancing"]
    },
    bgm : false
  })

  let mp3Play = {};

  useEffect(()=> {
    let track = null;

    switch (animation) {
      case 'Typing':
        track = typingMusic;
          break;
      case 'Salsa Dancing':
        track = salsaMusic;
          break;
      case 'Hiphop Dancing':
        track = hiphopMusic;
          break;
      case 'Silly Dancing':
        track = sillyMusic;
          break;
      default:
          track = null;
    }

    mp3Play = new Audio(track);

    if(bgm) {
      mp3Play.play();
      console.log('paly')
    }

    return () => {
      if(mp3Play !== null) {
        mp3Play.pause();
        // mp3Play.currentTime = 0;
      }
    }
  },[bgm, animation])

  return (
    <>
      <OrbitControls />
      <Sky />
      <Environment preset="sunset" />
      <group position-y={-1}>
        <ContactShadows opacity={0.42} scale={10} blur={1} far={10} resolution={256} color="#000000" />
        <Avatar animation={animation} />
        {
          animation === "Typing" && (
            <mesh scale={[0.8, 0.5, 0.8]} position-y={0.25}>
              <boxGeometry />
              <meshStandardMaterial color="white" />
            </mesh>
          )
        }
        <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={-0.001}>
          <planeGeometry />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </>
  );
};
