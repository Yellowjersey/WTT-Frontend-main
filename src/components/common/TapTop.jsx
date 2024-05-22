import { useEffect, useState } from "react";
import IcnTop from "../svg_icons/IcnTop";

const TapTop = () => {
  const [tapTopStyle, setTapTopStyle] = useState("none");
  const executeScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setTapTopStyle("flex");
    } else {
      setTapTopStyle("none");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="tap-top" style={{ display: tapTopStyle }} onClick={executeScroll}>
      <IcnTop className='h-8 w-8 text-danger/70' />
    </div>
  );
};

export default TapTop;
