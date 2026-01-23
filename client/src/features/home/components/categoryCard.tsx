import { PuzzlePieceIcon, BookOpenIcon, CodeBracketIcon, SpeakerWaveIcon, DocumentIcon, CpuChipIcon, PaintBrushIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

interface CategoryCardProps {
    category: "GAME" | "ASSET" | "COURSE" | "AUDIO" | "TEMPLATE" | "SOFTWARE" | "E-BOOK" | "VIDEO",
    quantity: number
}

const categoryTypes = {
    "GAME": {
        title: "Games",
        style: "border-app-purple/30 bg-app-purple/10 hover:border-app-purple hover:bg-app-purple/20",
        icon: <PuzzlePieceIcon className="h-8 w-8 text-white" />
    },
    "ASSET": {
        title: "Assets",
        style: "border-app-blue/30 bg-app-blue/10 hover:border-app-blue hover:bg-app-blue/20",
        icon: <PaintBrushIcon className="h-8 w-8 text-white" />
    },
    "COURSE": {
        title: "Cursos",
        style: "border-white/30 bg-white/10 hover:border-white hover:bg-white/20",
        icon: <CodeBracketIcon className="h-8 w-8 text-white" />
    },
    "AUDIO": {
        title: "Áudio",
        style: "border-app-light-gray/30 bg-app-light-gray/10 hover:border-app-light-gray hover:bg-app-light-gray/20",
        icon: <SpeakerWaveIcon className="h-8 w-8 text-white" />
    },
    "TEMPLATE": {
        title: "Templates",
        style: "border-red-200/30 bg-red-200/10 hover:border-red-200 hover:bg-red-200/20",
        icon: <DocumentIcon className="h-8 w-8 text-white" />
    },
    "SOFTWARE": {
        title: "Software",
        style: "border-green-200/30 bg-green-200/10 hover:border-green-200 hover:bg-green-200/20",
        icon: <CpuChipIcon className="h-8 w-8 text-white" />
    },
    "E-BOOK": {
        title: "E-books",
        style: "border-orange-400/30 bg-orange-400/10 hover:border-orange-400 hover:bg-orange-400/20",
        icon: <BookOpenIcon className="h-8 w-8 text-white" />
    },
    "VIDEO": {
        title: "Vídeos",
        style: "border-yellow-400/30 bg-yellow-400/10 hover:border-yellow-400 hover:bg-yellow-400/20",
        icon: <VideoCameraIcon className="h-8 w-8 text-white" />
    }
}

export function CategoryCard(data: CategoryCardProps) {

    return (
        <div>
            <a className={`${categoryTypes[data.category].style} group flex flex-col items-center justify-center p-6 rounded-xl border hover:shadow-[0_0_30px_hsl(280,100%,60%,0.3)] transition-all duration-300 cursor-pointer`}>
                <div className="p-4 rounded-lg bg-app-purple/10 mb-4 group-hover:scale-110 transition-transform">
                    {categoryTypes[data.category].icon}
                </div>
                <h3 className="font-display font-semibold text-white mb-1">{categoryTypes[data.category].title}</h3>
                <p className="text-sm text-white">{data.quantity} produtos</p>
            </a>
        </div>
    )
}