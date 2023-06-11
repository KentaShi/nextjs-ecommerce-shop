const MessengerDetail = (props) => {
    return <div>Conversation ID: {props.id}</div>
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    //const res = await getData("messages")

    // Get the paths we want to pre-render based on posts
    // const paths = res.products.map((product) => ({
    //     params: { id: product._id },
    // }))

    const paths = [
        {
            params: { id: "1111" },
        },
    ]

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params: { id } }) {
    //const res = await getData(`product/${id}`)
    return { props: { message: [], id: id } }
}

export default MessengerDetail
