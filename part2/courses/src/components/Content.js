import React from "react";

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ course }) => course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

const Total = ({ course }) => {
    let total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>Total of {total} exercises.</p>
    );
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    )
}

export default Course;