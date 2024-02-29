export default function SentenceTranslation({generatedData}) {
    return (
        <div className="flex w-full flex-col">
            <div className="card grid h-20 place-items-center rounded-box bg-base-300">
                <p>{ generatedData?.translation }</p>
            </div> 
        </div>  
    )
}