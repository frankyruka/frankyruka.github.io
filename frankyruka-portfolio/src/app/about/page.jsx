import Image from "next/image";
import About from "@/components/about/About";

export default function AboutPage() {

    const images = Array.from({ length: 19 });
    const imagePaths = images.map((_, i) => (
        `/media/character-design/character-design-${String(i + 1).padStart(2, '0') + '.jpg'}`
    ));

    return (
        <div className="flex flex-col col-span-2">
            {/* {imagePaths.map((path, index) =>(
                <Image key={index} src={path} width={500} height={500} alt={`Imagen ${index+1}`} />
            ))}; */}
            <About />
        </div>
    )
}