import { useAnimations, useFBX } from "@react-three/drei";
import { useShowcase } from "contexts/showcase";
import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Character = () => {
  const { setCharacter } = useShowcase();

  const ref = useRef();

  useEffect(() => {
    setCharacter(ref);
  }, [ref.current?.position.x]);
  const { nodes, materials } = useGLTF("/models/daniel.glb");

  const { animations: idle } = useFBX("/animations/idle.fbx");
  idle[0].name = "Idle";
  const { animations: walking } = useFBX("/animations/walking2.fbx");
  walking[0].name = "Walking";
  const { animations: backward } = useFBX("/animations/backward.fbx");
  backward[0].name = "Backward";

  const { actions } = useAnimations([idle[0], walking[0], backward[0]], ref);

  const { scene, distance, setFeedback } = useShowcase();

  const [anim, setAnim] = useState("Idle");
  let lastPos = 0,
    lastTime = 0;

  useFrame((_, delta) => {
    const trgt = scene === 2 ? distance : 5;
    const diff = Math.round((trgt - ref.current.position.x) * 100) / 100;
    if (diff < 0) {
      setAnim("Walking");
      ref.current.position.x -= delta * 1.1;
    } else if (diff > 0) {
      setAnim("Backward");
      ref.current.position.x += delta * 1.25;
    } else {
      setAnim("Idle");
    }

    setFeedback(ref.current.position.x > 5);
  });

  useEffect(() => {
    actions[anim].reset().fadeIn(0.25).play();
    return () => actions[anim].reset().fadeOut(0.75);
  }, [anim]);

  return (
    <group
      dispose={null}
      ref={ref}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      position={[0, -0.1, 0]}
    >
      <primitive object={nodes.Hips} />
      <skinnedMesh
        castShadow
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        castShadow
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        castShadow
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        castShadow
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        castShadow
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        castShadow
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        castShadow
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        castShadow
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        castShadow
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        castShadow
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
};

export default Character;

useGLTF.preload("/models/daniel.glb");
