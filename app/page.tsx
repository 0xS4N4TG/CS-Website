import {Skiper19} from "@/src/components/ui/stroke"
import ImageHover from "@/src/components/common/ImageHover";
import CardStack from "@/src/components/common/CardStack";
import Gallery3D from "@/src/components/common/Gallery3D";
import HorizontalGallery from "@/src/components/gallery/HorizontalGallery";
import TargetCursor from "@/src/components/common/TargetCursor";
import TeamCard from "@/src/components/common/TeamCard";
import DotGrid from "@/components/DotGrid";
import ScrollGrid from "@/src/components/common/ScrollGrid";


export default function Home() {
  return (
    <>
  <DotGrid
    dotSize={2}
    gap={16}
    baseColor="#121212"
    activeColor="#faa41a"
    proximity={100}
    shockRadius={370}
    shockStrength={5}
    resistance={1100}
    returnDuration={1.5}
  />
    
    <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
  hoverDuration={0.2}
/>
    <div>
      <Skiper19 />
      <ImageHover/>
<ScrollGrid/>

      <TeamCard
        image="https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
        name="John Doe"
        role="Lead Developer"
        socials={{
          linkedin: "https://linkedin.com/in/johndoe",
          twitter: "https://twitter.com/johndoe",
          github: "https://github.com/johndoe"
        }}
        className="w-[400px] h-[600px]"
      />
      
      <HorizontalGallery/>
    </div>
    
    
     
    <div>
    <CardStack/>
    </div>

   <section style={{ width: '100%', height: '600px' }}>
  <Gallery3D title="IEEE CS" />
</section>
    
    </>
  );
}
  
