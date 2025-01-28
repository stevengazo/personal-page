import { useParams } from "react-router-dom";



const ProjectView = ()=>{
    const {id} = useParams()

    return <>
    <div className="bg-slate-700 w-screen h-screen  flex flex-col justify-start items-center p-4">
        <h1 className="mx-auto text-white text-3xl">
            Proyecto
        </h1>
    </div>
    </>
}


export default ProjectView;