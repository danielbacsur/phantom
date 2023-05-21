import { memo, useRef, forwardRef, createRef, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Grid,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  useGLTF,
  CameraControls,
  Capsule,
  SoftShadows,
  MeshDistortMaterial,
  Box,
  MeshTransmissionMaterial,
  OrthographicCamera,
  Line,
} from "@react-three/drei";
import { useShowcase } from "contexts/showcase";
import { damp, damp3 } from "maath/easing";
import { lerp } from "three/src/math/MathUtils";
import { Perf } from "r3f-perf";
import { TextureLoader, Vector3 } from "three";
import { RGBELoader } from "three-stdlib";
import { button, useControls } from "leva";

const Visualization = () => {
  const cypher = useRef();
  const character = useRef();
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
      <Perf position="top-left" />
      <Suspense fallback={null}>
        <Camera cypher={cypher} character={character} />
        <Environment preset="city" />
        <Ground />
        <Shadows />
        <Radius />
        <Cypher ref={cypher} />
        <Character ref={character} />
      </Suspense>
    </Canvas>
  );
};

const Character = forwardRef((_, ref) => {
  const showcase = useShowcase();

  useFrame((_, delta) => {
    ref.current.position.x = lerp(
      ref.current.position.x,
      showcase.distancing.rssi,
      delta * 4
    );
  });

  return (
    <Center top ref={ref}>
      <Capsule castShadow args={[0.5, 1, 16, 16]} />
    </Center>
  );
});



function Radius() {
  const texture = useLoader(TextureLoader, "/radius.png")
  return (
    // <mesh rotation={[-Math.PI / 2,0, 0]}>
    //   <planeBufferGeometry attach="geometry" args={[10, 10]} />
    //   <meshBasicMaterial attach="material" map={texture} transparent/>
    // </mesh>

    <Line
  points={[[5, 0, -1], [5, 0, 1]]}       // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
  color="black"                   // Default
  lineWidth={1}                   // In pixels (default)
  segments                        // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
  dashed={false}                  // Default
  vertexColors={[[0, 0, 0], [0, 0, 0]]} // Optional array of RGB values for each point
/>
  )
}

const Cypher = forwardRef((_, ref) => {
  const showcase = useShowcase();
  useFrame((_, delta) => {
    const time = new Date().getTime() / 5000;

    if (showcase.scene.index === 1) {
      ref.current.position.y = lerp(ref.current.position.y, 1, delta * 2);
      damp3(
        ref.current.rotation,
        new Vector3(
          Math.cos(time * 4) / 8,
          Math.sin(time * 3) / 4,
          Math.sin(time * 2) / 8
        ),
        0.5,
        delta
      );
    } else {
      ref.current.position.y = lerp(ref.current.position.y, 0, delta * 4);
      damp3(ref.current.rotation, [0, 0, 0], 0.25, delta);
    }
  });

  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );

  const config = useControls({
    text: "alpha",
    backside: true,
    animStage: true,
    backsideThickness: { value: 0.3, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    clearcoat: { value: 1, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 1, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 5 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
    distortion: { value: 4, min: 0, max: 40, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 10, step: 0.01 },
    temporalDistortion: { value: 0.05, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2, step: 0.01 },
    color: "#ff9cf5",
    gColor: "#ff7eb3",
    shadow: "#750d57",
    autoRotate: false,
    screenshot: button(() => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        document
          .querySelector("canvas")
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    }),
    visualization: { value: 0, min: 0, max: 3, step: 1 },
  });

  return (
    // <Center top>
    //   <Suzi ref={ref} rotation={[-0.63, 0, 0]} />
    // </Center>
    <Center ref={ref}>
      <Box
        args={[0.86, 0.016, 0.54]}
        castShadow
      >
        <MeshTransmissionMaterial {...config} background={texture} />
        {/* <meshBasicMaterial wireframe color={"#ffffff"} /> */}
        {/* <Edges color="white" /> */}
      </Box>
    </Center>
  );
});

const Camera = ({ cypher, character }) => {
  const cameraControlsRef = useRef();
  const { camera } = useThree();

  // const {
  //   minDistance,
  //   enabled,
  //   verticalDragToForward,
  //   dollyToCursor,
  //   infinityDolly,
  // } = useControls({
  //   thetaGrp: buttonGroup({
  //     label: "rotate theta",
  //     opts: {
  //       "+45º": () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
  //       "-90º": () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
  //       "+360º": () =>
  //         cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true),
  //     },
  //   }),
  //   phiGrp: buttonGroup({
  //     label: "rotate phi",
  //     opts: {
  //       "+20º": () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
  //       "-40º": () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true),
  //     },
  //   }),
  //   truckGrp: buttonGroup({
  //     label: "truck",
  //     opts: {
  //       "(1,0)": () => cameraControlsRef.current?.truck(1, 0, true),
  //       "(0,1)": () => cameraControlsRef.current?.truck(0, 1, true),
  //       "(-1,-1)": () => cameraControlsRef.current?.truck(-1, -1, true),
  //     },
  //   }),
  //   dollyGrp: buttonGroup({
  //     label: "dolly",
  //     opts: {
  //       1: () => cameraControlsRef.current?.dolly(1, true),
  //       "-1": () => cameraControlsRef.current?.dolly(-1, true),
  //     },
  //   }),
  //   zoomGrp: buttonGroup({
  //     label: "zoom",
  //     opts: {
  //       "/2": () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
  //       "/-2": () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true),
  //     },
  //   }),
  //   minDistance: { value: 0 },
  //   moveTo: folder(
  //     {
  //       vec1: { value: [3, 5, 2], label: "vec" },
  //       "moveTo(…vec)": button((get) =>
  //         cameraControlsRef.current?.moveTo(...get("moveTo.vec1"), true)
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   "fitToBox(mesh)": button(() =>
  //     cameraControlsRef.current?.fitToBox(meshRef.current, true)
  //   ),
  //   setPosition: folder(
  //     {
  //       vec2: { value: [-5, 2, 1], label: "vec" },
  //       "setPosition(…vec)": button((get) =>
  //         cameraControlsRef.current?.setPosition(
  //           ...get("setPosition.vec2"),
  //           true
  //         )
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   setTarget: folder(
  //     {
  //       vec3: { value: [3, 0, -3], label: "vec" },
  //       "setTarget(…vec)": button((get) =>
  //         cameraControlsRef.current?.setTarget(...get("setTarget.vec3"), true)
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   setLookAt: folder(
  //     {
  //       vec4: { value: [1, 2, 3], label: "position" },
  //       vec5: { value: [1, 1, 0], label: "target" },
  //       "setLookAt(…position, …target)": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           ...get("setLookAt.vec4"),
  //           ...get("setLookAt.vec5"),
  //           true
  //         )
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   lerpLookAt: folder(
  //     {
  //       vec6: { value: [-2, 0, 0], label: "posA" },
  //       vec7: { value: [1, 1, 0], label: "tgtA" },
  //       vec8: { value: [0, 2, 5], label: "posB" },
  //       vec9: { value: [-1, 0, 0], label: "tgtB" },
  //       t: { value: Math.random(), label: "t", min: 0, max: 1 },
  //       "f(…posA,…tgtA,…posB,…tgtB,t)": button((get) => {
  //         return cameraControlsRef.current?.lerpLookAt(
  //           ...get("lerpLookAt.vec6"),
  //           ...get("lerpLookAt.vec7"),
  //           ...get("lerpLookAt.vec8"),
  //           ...get("lerpLookAt.vec9"),
  //           get("lerpLookAt.t"),
  //           true
  //         );
  //       }),
  //     },
  //     { collapsed: true }
  //   ),
  //   saveState: button(() => cameraControlsRef.current?.saveState()),
  //   reset: button(() => cameraControlsRef.current?.reset(true)),
  //   enabled: { value: true, label: "controls on" },
  //   verticalDragToForward: {
  //     value: false,
  //     label: "vert. drag to move forward",
  //   },
  //   dollyToCursor: { value: false, label: "dolly to cursor" },
  //   infinityDolly: { value: false, label: "infinity dolly" },
  // });

  const showcase = useShowcase();

  useFrame((_, delta) => {
    const time = new Date().getTime() / 5000;

    if (showcase.scene.index === 0) {
      cameraControlsRef.current?.setLookAt(
        Math.sin(time) * 6,
        6,
        Math.cos(time) * 6,
        0,
        0,
        0,
        true
      );
      camera.fov = lerp(camera.fov, 12, delta * 2);
    } else if (showcase.scene.index === 1) {
      cameraControlsRef.current?.setLookAt(
        (character.current.position.x - cypher.current.position.x) * 0.75 - 0.5,
        3,
        6,
        (character.current.position.x - cypher.current.position.x) * 0.5,
        1,
        0,
        true
      );
      camera.fov = lerp(camera.fov, 60, delta * 2);

    } else if (showcase.scene.index === 2) {
      cameraControlsRef.current?.setLookAt(0, 6, 0, 0, 0, 0, true);
      camera.fov = lerp(camera.fov, 12, delta * 2);
    }

    camera.updateProjectionMatrix();
  });

  return <CameraControls ref={cameraControlsRef} />;
};

function Ground() {
  const gridConfig = {
    cellSize: 0.25,
    cellThickness: 0.25,
    cellColor: "#6f6f6f",
    sectionSize: 1,
    sectionThickness: 0.5,
    sectionColor: "#9d4b4b",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

const Shadows = memo(() => (
  // <AccumulativeShadows
  //   temporal
  //   frames={100}
  //   color="#9d4b4b"
  //   colorBlend={0.5}
  //   alphaTest={0.9}
  //   scale={20}
  // >
  //   <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  // </AccumulativeShadows>
  // <SoftShadows size={35} focus={1} samples={16} />
  <SoftShadows />
));

const Suzi = forwardRef((props, ref) => {
  const { nodes } = useGLTF(
    "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-high-poly/model.gltf"
  );
  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      geometry={nodes.Suzanne.geometry}
      {...props}
    >
      <meshStandardMaterial color="#9d4b4b" />
    </mesh>
  );
});
export default Visualization;
