import SketchBook from "@/components/sketchbook/Sketchbook";
import Image from "next/image";

export default function SketchBookPage() {

    const images = Array.from({ length: 19 });
    const imagePaths = images.map((_, i) => (
        `/media/character-design/character-design-${String(i + 1).padStart(2, '0') + '.jpg'}`
    ));

    // return (
    //     <div className="flex flex-col col-span-2">
    //         {/* {imagePaths.map((path, index) =>(
    //             <Image key={index} src={path} width={500} height={500} alt={`Imagen ${index+1}`} />
    //         ))}; */}
    //         <p>hola</p>
    //     </div>
    // )

    return(
        <SketchBook />
    )
}