export default function Verb({generatedData}) {
    return (
        <div className="flex w-full flex-col">
            <BoxDivider>Infinitive</BoxDivider>
            <BoxContainer>
                <p>{ generatedData?.infinitive }</p>
            </BoxContainer> 
            <BoxDivider>Present perfect</BoxDivider>
            <BoxContainer>
                <p>{ generatedData?.present_perfect?.aux_verb }</p>
                <p>{ generatedData?.present_perfect?.verb }</p>
            </BoxContainer> 
            <BoxContainer>
                <p>{ generatedData?.present_perfect?.example }</p>
            </BoxContainer>
            <BoxDivider>Past simple</BoxDivider>    
            <BoxContainer>
                <p>{ generatedData?.past?.verb }</p>
            </BoxContainer>
            <BoxContainer>
                <p>{ generatedData?.past?.example }</p>
            </BoxContainer>
        </div>  
    )
}

function BoxContainer({children}) {
    return (
        <div className="card m-1 grid h-20 place-items-center rounded-box bg-base-300">
            {children}
        </div> 
    )
}

function BoxDivider({children}) {
    return (
        <div className="divider divider-primary">
            {children}
        </div>
    )
}