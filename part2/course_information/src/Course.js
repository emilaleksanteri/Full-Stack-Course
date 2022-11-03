import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

const Course = ({ name, parts }) => {

    return (
        <div>
            <Header header={name} />
            <Content content={parts} />
            <Total total={parts} />
        </div>
    )
}

export default Course