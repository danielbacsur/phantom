const Overlay = () => {
  return (
    <>
      <div className="absolute top-24 left-24">
        <div className="space-y-8">
          <span className="font-display text-[64px] leading-[1]">
            A_PHANTOM_CSAPATA
          </span>

          <div className="-ml-12 text-[14px]">
            <b>Bacsur Dániel & Mikó Erik</b>
            <p>Közgazdasági Politechnikum</p>
            <b>—</b>
          </div>
        </div>
      </div>
      <div className="absolute top-24 right-24">
        <span className="font-display text-[64px] leading-[1]">32. OTIO</span>
      </div>
      <div className="absolute bottom-24 left-24">
        <div className="space-y-8">
          <span className="font-display text-[240px] leading-[1]">CYPHER</span>
        </div>
      </div>
      <div className="absolute bottom-24 right-24">
        <div className="space-y-8">
          <span className="font-display text-[240px] leading-[1]">_ALPHA</span>
        </div>
      </div>
    </>
  );
};

export default Overlay;
