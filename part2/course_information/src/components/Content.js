import Part from './Part'

const Content = ({ content }) => {
    return (
        <div>
            {content.map(part => 
            <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

export default Content