const SingleCharPage = ({ data }) => {

    console.log(data);
    const { name, description, thumbnail } = data;

    return (
        <>

            <img src={thumbnail} alt={name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </>
    )
}
export default SingleCharPage;