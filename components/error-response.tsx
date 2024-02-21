import NoResults from "@/assets/noResults.svg"

export const ErrorResponse = () => {
    return (
        <div className="flex flex-col justify-center items-center py-5">
            <NoResults />
            <h1 className="text-gray-500 text-md font-meduim text-center ">There is no results of that product</h1>
        </div>
    )
}