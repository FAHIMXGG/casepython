interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

const page = async ({ searchParams }: PageProps) => {
    const { id } = searchParams
    return (
        <p>
            { id }
        </p>
    );
};

export default page;