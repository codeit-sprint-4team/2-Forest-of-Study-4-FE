const Introduce = ({ content, point }) => {
    return (
        <div>
            <h2>소개</h2>
            <p>{content}</p>
            <h2>현재까지 획득한 포인트</h2>
            <p>{point}p 획득</p>
        </div>
    )
}

export default Introduce