import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { LuExpand } from "react-icons/lu";

export default function FilesGrid({ files, changeSelection }: { files: any[], changeSelection: any }) {
    return (
        <div className='grow px-10 overflow-auto'>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file: any, index: number) => ( 
            <div 
              key={index} 
              className="relative cursor-pointer"
              onClick={() => changeSelection(index)}
            >
              <img
                className="h-64 w-64 object-cover rounded-lg select-none pointer-events-none"
                src={file.publicUrl}
                alt={`Image ${index + 1}`}
              />
              <span
                className="text-black bg-white bg-opacity-50 rounded-full absolute right-2 top-2"
              >
                { file.selected ? (
                      <FaCheckCircle />
                ) : (
                      <FaRegCircle />
                )}
              </span>
              {/* <span
                className="bg-opacity-50 absolute right-2 bottom-2"
              >
                <LuExpand />
              </span> */}
            </div>
          ))}
        </div>
      </div>
    );
}